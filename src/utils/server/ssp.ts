import { GetServerSidePropsContext, Redirect } from 'next';
import md5 from 'md5';
import fs from 'fs';
import path from 'path';
import {
    ConfigProps, PageApiProps, PageProps,
} from '@/types/page';
import getLexicon from 'src/lexicon/getLexicon';
import store from '@/store/store';
import env from '../env';
import normalizers from '../normalizers';
import serverSettings from './settings';

interface ErrorProps {
    isError: true;
    message?: string;
    response?: string;
}



/**
 * Fetch server side props or resolve the props from cache
 */
export default async function fetchSSP (
    context: GetServerSidePropsContext,
    useCache = process.env.SSP_CACHE === 'true',
): Promise<({
    props: PageProps
} | {
    redirect: Redirect;
})> {
    // get api props
    const pageApiProps = await getAPIPageProps(context, useCache);

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
    useCache: boolean,
): Promise<PageApiProps | ErrorProps | {
    redirect: Redirect;
}> {
    // get urls
    const { resolvedUrl, res, req } = context;
    const urlWithoutParameters = resolvedUrl.split('?')[0];

    // get urls parameters
    const urlParams = new URLSearchParams(resolvedUrl.split('?')[1]);
    urlParams.delete('slug');
    const urlHasParameters = Array.from(urlParams.values()).length > 0;

    // decide if we can get cached file
    const urlDeniesCache = resolvedUrl.includes('noCache');
    const requireClearCache = resolvedUrl.includes('clearCache');
    const allowCache = !urlHasParameters && !urlDeniesCache && !requireClearCache && useCache;

    // get file name
    const cacheFileName = path.join(serverSettings.cacheDir, `${md5(urlWithoutParameters)}.json`);

    // clear cache of this very page if required
    if (requireClearCache) {
        try {
            if (fs.existsSync(cacheFileName)) {
                fs.unlinkSync(cacheFileName);
            }
        } catch (e) {
            //
            throw new Error(`Cannot clear ${cacheFileName}`);
        }
    }

    // get cached props
    if (allowCache) {
        let props: false | PageApiProps = false;
        try {
            if (fs.existsSync(cacheFileName)) {
                const contents = fs.readFileSync(cacheFileName, { encoding: 'utf8', flag: 'r' }) || '';
                props = JSON.parse(contents);
            }
        } catch (err) {
            // if error while parsing
            res.statusCode = 500;
            return {
                isError: true,
                message: `Cannot read ${cacheFileName}`,
            };
        }
        // if props are parsed
        if (props) {
            return props;
        }
    }

    // FETCH PROPS

    // get api data
    let apiURL: URL;
    if (process.env.NEXT_PUBLIC_URL_API_PAGE) {
        apiURL = new URL(
            normalizers.urlSlashes(`${process.env.NEXT_PUBLIC_URL_API_PAGE}/${resolvedUrl}`),
        );
    } else {
        apiURL = new URL(
            normalizers.urlSlashes(`${env.getReqUrlBase(req)}/api/page/${resolvedUrl}`),
        );
    }
    apiURL.searchParams.delete('slug');
    let response: Response;
    try {
        response = await (await fetch(apiURL.href, {
            headers: {
                APIKEY: process.env.API_KEY || '',
            },
        }));
    } catch (e) {
        res.statusCode = 503;
        return {
            isError: true,
            message: 'API unavailable',
        };
    }

    // check if redirected
    if (!/\.(.*)$/.test(resolvedUrl)) {
        if (response.redirected) {
            if (response.url) {
                const redirectURL = normalizers.urlSlashes(`/${response.url.replace(
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
    res.statusCode = response.status;
    res.statusMessage = response.statusText;
    const responseClone = response.clone();

    // get json response
    let props: PageApiProps;
    try {
        props = await response.json();
    } catch (e) {
        const text = await responseClone.text();
        res.statusCode = 500;
        return {
            isError: true,
            message: res.statusCode !== 200 ? `${res.statusCode} ${res.statusMessage}` : 'Cannot parse JSON',
            response: text,
        };
    }

    // save props
    if (allowCache && res.statusCode === 200) {
        try {
            if (!fs.existsSync(serverSettings.cacheDir)) {
                fs.mkdirSync(serverSettings.cacheDir);
            }
            fs.writeFileSync(cacheFileName, JSON.stringify(props));
        } catch (e) {
            res.statusCode = 500;
            return {
                isError: true,
                message: `Cannot write file ${cacheFileName} ${e}`,
            };
        }
    }

    return props;
}



function getConfig (
    context: GetServerSidePropsContext,
): ConfigProps {
    const key = +new Date();

    // set url data
    const { resolvedUrl } = context;
    const baseUrl = env.getReqUrlBase(context.req);
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
