import { ConfigProps, PageApiProps } from '@/types/page';
import normalizers from '@/utils/normalizers';
import { GetServerSidePropsContext } from 'next';
import getLexicon from 'src/lexicon/getLexicon';
import store from '@/store/store';
import pagePropsSlice from '@/store/reducers/pageProps';
import configSlice from '@/store/reducers/config';
import lexiconSlice from '@/store/reducers/lexicon';
import { SspServer } from '@/types/ssp';
import serverEnv from './env';

const pageCache: Map<string, SspServer> = new Map();

/**
 * Fetch server side props
 */
export default async function fetchSSP (
    context: GetServerSidePropsContext,
) {
    const { res } = context;

    // get props
    const props = await getSSP(context);
    res.statusCode = props.api.statusCode;
    res.statusMessage = props.api.statusText;

    // update store
    if (props.data) {
        store.dispatch(pagePropsSlice.actions.set(props.data.props));
        store.dispatch(configSlice.actions.set(props.data.config));
        store.dispatch(lexiconSlice.actions.set(props.data.lexicon));
    }

    return props;
}

/**
 * Fetch page props or get them from cache
 */
async function getSSP (
    context: GetServerSidePropsContext,
) {
    // setup
    let data: SspServer | undefined;
    const time = +new Date();

    // get urls
    const { resolvedUrl, req } = context;
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

    // url settings
    const clearCacheParam = apiURL.searchParams.get('clear-cache');
    const noCacheParam = apiURL.searchParams.get('no-cache');

    // remove extra params
    apiURL.searchParams.delete('slug');
    apiURL.searchParams.delete('clear-cache');
    apiURL.searchParams.delete('no-cache');

    // get cache settings
    const useCache = !noCacheParam && !clearCacheParam && process.env.SSP_CACHE === 'true';

    // clear cache
    if (clearCacheParam) {
        if (clearCacheParam === 'all') {
            pageCache.clear();
        } else {
            pageCache.delete(apiURL.href);
        }
        return {
            time,
            api: {
                url: apiURL.href,
                statusCode: 200,
                statusText: 'CACHE_CLEARED',
            },
            error: {
                name: 'Cache is cleared',
            },
        };
    }

    // check cache size
    if (useCache) {
        let maxSize = parseInt(process.env.SSP_CACHE_LIMIT!, 10);
        maxSize = Number.isInteger(maxSize) ? maxSize : 100;
        if (pageCache.size > maxSize) {
            pageCache.clear();
        }
    }

    // get cached data
    let cachedData = useCache ? pageCache.get(apiURL.href) : undefined;
    // and check its age
    if (cachedData) {
        if (time - cachedData.time > parseInt(process.env.SSP_CACHE_AGE!, 10) * 1000) {
            cachedData = undefined;
        }
    }
    data = cachedData;

    // if there is no cached data, fetch it
    if (!cachedData) {
        // fetch props from api
        try {
            const response = await fetch(apiURL.href, {
                headers: {
                    APIKEY: process.env.API_KEY || '',
                },
            });

            // parse props
            let jsonProps: PageApiProps;
            try {
                jsonProps = await response.json();
                data = {
                    time,
                    api: {
                        url: apiURL.href,
                        statusCode: response.status,
                        statusText: response.statusText,
                    },
                    data: {
                        props: jsonProps,
                        config: null as any,
                        lexicon: null as any,
                    },
                };

                // check for redirects
                if ((!/\.(.*)$/.test(resolvedUrl)) && response.redirected) {
                    const redirectURL = normalizers.urlSlashes(`/${response.url.replace(
                        process.env.NEXT_PUBLIC_URL_API_PAGE || '',
                        '',
                    )}`);
                    data.redirect = {
                        destination: redirectURL,
                        statusCode: 301,
                    };
                }

                // add to cache
                if (useCache && !response.redirected && response.status === 200) {
                    pageCache.set(apiURL.href, data!);
                }
            } catch (e: any) {
                // error when the properties cannot be parsed
                data = {
                    time,
                    api: {
                        url: apiURL.href,
                        statusCode: 500,
                        statusText: 'JSON_PARSE_ERROR',
                    },
                    error: {
                        name: `${e}`,
                        body: await response.text(),
                    },
                };
            }
        } catch (e: any) {
            data = {
                time,
                api: {
                    url: apiURL.href,
                    statusCode: 502,
                    statusText: 'API_UNAVAILABLE',
                },
                error: {
                    name: `${e}`,
                },
            };
        }
    }
    data = data!;

    // update lexicon
    if (data.data) {
        data.data.lexicon = getLexicon(data.data.props.global.lang);
    }

    // update config
    if (data.data) {
        const baseUrl = serverEnv.getReqUrlBase(context.req);
        const currentUrl = normalizers.urlSlashes(`${baseUrl}/${resolvedUrl}`);
        const currentUrlData = new URL(currentUrl);
        const url: ConfigProps['url'] = {
            base: baseUrl,
            url: currentUrl,
            canonical: normalizers.urlSlashes(`${currentUrlData.origin}/${currentUrlData.pathname}`),
        };
        data.data.config = {
            key: time,
            url,
            updatedAt: new Date(data.time).toString(),
        };
    }

    // set meta image
    if (data.data) {
        if (!data.data.props.global.meta.image) {
            const matches = JSON.stringify(data.data.props).match(new RegExp('(http?s)[^"\' ]*\\.(jpg|png)'));
            if (matches) {
                data.data.props.global.meta.image = matches.shift();
            }
        }
    }

    return data;
}
