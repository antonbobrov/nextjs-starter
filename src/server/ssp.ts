import { GetServerSidePropsContext, Redirect } from 'next';
import {
    ConfigProps, PageApiProps, SSPResponse,
} from '@/types/page';
import getLexicon from 'src/lexicon/getLexicon';
import store from '@/store/store';
import serverEnv from './env';
import normalizers from '../utils/normalizers';

interface ErrorProps {
    isError: true;
    message?: string;
    response?: string;
}

interface RedirectProps {
    redirect: Redirect;
}

interface CacheItem {
    time: number;
    redirected: boolean;
    url: string;
    status: number;
    statusText: string;
    text: string;
}

const pageCache: Map<string, CacheItem> = new Map();



/**
 * Fetch server side props
 */
export default async function fetchSSP (
    context: GetServerSidePropsContext,
): Promise<({
    props: SSPResponse
} | RedirectProps)> {
    // get api props
    const pageApiProps = await getAPIPageProps(context);

    // process redirect
    if ('redirect' in pageApiProps) {
        return {
            redirect: pageApiProps.redirect,
        };
    }

    // process errors
    if ('isError' in pageApiProps) {
        return {
            props: {
                response: {
                    success: false,
                    error: {
                        message: pageApiProps.message || null,
                        response: pageApiProps.response || null,
                    },
                },
            },
        };
    }

    // add response
    const props: SSPResponse = {
        response: {
            success: true,
        },
        props: pageApiProps,
        config: getConfig(context),
        lexicon: getLexicon(pageApiProps.global.lang),
    };
    props.props = setMetaImage(props.props!);

    // update store
    store.dispatch({
        type: 'SET_PAGE_PROPS',
        data: props.props,
    });
    store.dispatch({
        type: 'SET_CONFIG',
        data: props.config!,
    });
    store.dispatch({
        type: 'SET_LEXICON',
        data: props.lexicon!,
    });

    return {
        props,
    };
}



async function getAPIPageProps (
    context: GetServerSidePropsContext,
): Promise<PageApiProps | ErrorProps | RedirectProps> {
    // get urls
    const { resolvedUrl, res, req } = context;
    let apiURL: URL;
    if (process.env.NEXT_PUBLIC_URL_API_PAGE) {
        apiURL = new URL(
            normalizers.urlSlashes(`${process.env.NEXT_PUBLIC_URL_API_PAGE}/${resolvedUrl}`),
        );
    } else {
        apiURL = new URL(
            normalizers.urlSlashes(`${serverEnv.getReqUrlBase(req)}/api/page/${resolvedUrl}`),
        );
    }
    apiURL.searchParams.delete('slug');

    // get cache settings
    const clearCache = apiURL.searchParams.get('clear-cache');
    const useCache = !apiURL.searchParams.get('no-cache') && process.env.SSP_CACHE === 'true' && !clearCache;
    if (clearCache) {
        if (clearCache === 'all') {
            pageCache.clear();
        } else {
            pageCache.delete(apiURL.href);
        }
    }

    // remove cache identifiers from url
    apiURL.searchParams.delete('no-cache');
    apiURL.searchParams.delete('clear-cache');

    // page data
    let data: CacheItem;

    // check if the url is already pageCache
    const pageCacheResponse = useCache ? pageCache.get(apiURL.href) : undefined;
    if (pageCacheResponse) {
        data = pageCacheResponse;
    } else {
        // otherwise fetch props from api
        try {
            const response = await (await fetch(apiURL.href, {
                headers: {
                    APIKEY: process.env.API_KEY || '',
                },
            }));
            data = {
                time: +new Date(),
                redirected: response.redirected,
                url: response.url,
                status: response.status,
                statusText: response.statusText,
                text: await response.text(),
            };
            if (useCache) {
                pageCache.set(apiURL.href, data);
            }
        } catch (e: any) {
            res.statusCode = 503;
            return {
                isError: true,
                message: 'API unavailable ',
                response: `${e}`,
            };
        }
    }

    // check if redirected
    if (!/\.(.*)$/.test(resolvedUrl)) {
        if (data.redirected) {
            if (data.url) {
                const redirectURL = normalizers.urlSlashes(`/${data.url.replace(
                    process.env.NEXT_PUBLIC_URL_API_PAGE || '',
                    '',
                )}`);
                return {
                    redirect: {
                        destination: redirectURL,
                        statusCode: 301,
                    },
                };
            }
        }
    }

    // set status
    res.statusCode = data.status;
    res.statusMessage = data.statusText;

    // get json response
    let props: PageApiProps;
    try {
        props = JSON.parse(data.text);
    } catch (e) {
        res.statusCode = 500;
        return {
            isError: true,
            message: res.statusCode !== 200 ? `${res.statusCode} ${res.statusMessage}` : 'Cannot parse JSON',
            response: data.text,
        };
    }

    return props;
}



function getConfig (
    context: GetServerSidePropsContext,
): ConfigProps {
    const key = +new Date();

    // set url data
    const { resolvedUrl } = context;
    const baseUrl = serverEnv.getReqUrlBase(context.req);
    const currentUrl = normalizers.urlSlashes(`${baseUrl}/${resolvedUrl}`);
    const currentUrlData = new URL(currentUrl);
    const url: ConfigProps['url'] = {
        base: baseUrl,
        url: currentUrl,
        canonical: normalizers.urlSlashes(`${currentUrlData.origin}/${currentUrlData.pathname}`),
    };

    return {
        key,
        url,
    };
}



function setMetaImage (
    pageProps: PageApiProps,
) {
    const props: PageApiProps = {
        ...pageProps,
    } as PageApiProps;

    // search meta image
    if (!props.global.meta.image) {
        const matches = JSON.stringify(props).match(new RegExp('(http?s)[^"\' ]*\\.(jpg|png)'));
        if (matches) {
            props.global.meta.image = matches.shift();
        }
    }

    return props;
}
