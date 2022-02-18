import { GetServerSidePropsContext, Redirect } from 'next';
import {
    ConfigProps, PageApiProps, PageProps,
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

const cached: Map<string, CacheItem> = new Map();



/**
 * Fetch server side props
 */
export default async function fetchSSP (
    context: GetServerSidePropsContext,
): Promise<({
    props: PageProps
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
            } as PageProps,
        };
    }

    // add response
    let props: PageProps = {
        ...pageApiProps,
        response: {
            success: true,
        },
        config: getConfig(context),
        lexicon: getLexicon(pageApiProps.global.lang),
    };
    props = setMetaImage(props);

    // update store
    store.dispatch({
        type: 'SET_PAGE_PROPS',
        data: props,
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

    // page data
    let data: CacheItem;

    console.log(cached.keys());

    // check if the url is already cached
    const cachedResponse = cached.get(apiURL.href);
    if (cachedResponse) {
        data = cachedResponse;
        console.log(`from cache ${apiURL.href}`);
    } else {
        console.log(`from api ${apiURL.href}`);
        // otherwise fetch props from api
        try {
            const response = await (await fetch(apiURL.href, {
                headers: {
                    APIKEY: process.env.API_KEY || '',
                },
            }));
            cached.set(apiURL.href, {
                time: +new Date(),
                redirected: response.redirected,
                url: response.url,
                status: response.status,
                statusText: response.statusText,
                text: await response.text(),
            });
            data = cached.get(apiURL.href)!;
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

    // add user config
    const requestHeaders = context.req.headers;
    const userAgent = requestHeaders['user-agent'];
    const user: ConfigProps['user'] = {
        supportsWebP: (
            (!!requestHeaders && !!requestHeaders.accept && requestHeaders.accept.includes('image/webp'))
            || (!!userAgent && (() => {
                let m: any = userAgent.match(/(Edg|Firefox)\/(\d+)\./);
                if (m) {
                    return (m[1] === 'Firefox' && m[2] >= 65) || (m[1] === 'Edge' && m[2] >= 18);
                }
                m = userAgent.match(/OS X\s?(?<os>\d+)?.+ Version\/(?<v>\d+\.\d+)/);
                if (m) {
                    return m.groups.v >= 14 && (m.groups.os || 99) >= 11;
                }
                return false;
            })())
        ),
        supportsAvif: (
            (!!requestHeaders && !!requestHeaders.accept && requestHeaders.accept.includes('image/avif'))
        ),
    };

    return {
        key,
        url,
        user,
    };
}



function setMetaImage (
    pageProps: PageProps,
) {
    const props: PageProps = {
        ...pageProps,
    } as PageProps;

    // search meta image
    if (!props.global.meta.image) {
        const matches = JSON.stringify(props).match(new RegExp('(http?s)[^"\' ]*\\.(jpg|png)'));
        if (matches) {
            props.global.meta.image = matches.shift();
        }
    }

    return props;
}
