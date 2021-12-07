import { GetServerSidePropsContext } from 'next';
import md5 from 'md5';
import fs from 'fs';
import path from 'path';
import getConfig from 'next/config';
import { TemplateProps } from '@/types/page';
import env from '../env';
import normalizers from '../normalizers';

const { serverRuntimeConfig } = getConfig();
const cacheFileDir = path.join(serverRuntimeConfig.PROJECT_ROOT, '.ssp-cache');

/**
 * Remove cached server side props
 */
export function clearSSPCache () {
    try {
        fs.readdir(cacheFileDir, (fileError, files) => {
            if (!fileError) {
                files.forEach((file) => {
                    fs.unlink(path.join(cacheFileDir, file), (err) => {
                        if (err) throw err;
                    });
                });
            }
        });
        return {
            success: true,
        };
    } catch (e) {
        return {
            success: false,
            message: e,
        };
    }
}

/**
 * Fetch server side props or resolve the props from cache
 */
export async function fetchSSP (
    context: GetServerSidePropsContext,
    useCache = process.env.SSP_CACHE === 'true',
) {
    const { res } = context;
    let props!: TemplateProps;

    // get urls
    const { resolvedUrl } = context;
    const urlWithoutParameters = resolvedUrl.split('?')[0];
    const urlParams = new URLSearchParams(resolvedUrl.split('?')[1]);
    urlParams.delete('slug');
    const urlHasParameters = Array.from(urlParams.values()).length > 0;

    // decide if can get cached file
    const urlDeniesCache = resolvedUrl.includes('noCache');
    const clearCache = resolvedUrl.includes('clearCache');
    const allowCache = !urlHasParameters && !urlDeniesCache && !clearCache && useCache;

    // get file name
    const cacheFileName = path.join(cacheFileDir, `${md5(urlWithoutParameters)}.json`);

    // clear cache if required
    if (clearCache) {
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
    let cachedProps: any | undefined;
    if (allowCache) {
        try {
            if (fs.existsSync(cacheFileName)) {
                const contents = fs.readFileSync(cacheFileName, { encoding: 'utf8', flag: 'r' }) || '';
                cachedProps = JSON.parse(contents);
            }
        } catch (err) {
            throw new Error(`Cannot read ${cacheFileName}`);
        }
    }

    // USE CACHED PROPS
    if (cachedProps) {
        props = cachedProps;
    } else {
        // FETCH PROPS

        // get api data
        const apiURL = env.getUrlApiPage(resolvedUrl);
        let response!: Response;
        try {
            response = await (await fetch(apiURL, {
                headers: {
                    APIKEY: process.env.API_KEY || '',
                },
            }));
        } catch (e) {
            props = {
                success: false,
                errorMessage: 'API unavailable',
            } as any;
            res.statusCode = 503;
        }

        if (!props) {
            // check redirects
            if (response.redirected && process.env.API_IS_REAL === 'true') {
                const redirectUrl = new URL(response.url);
                res.setHeader('location', redirectUrl.pathname);
                res.statusCode = 301;
                res.end();
            }

            // set status
            res.statusCode = response.status;
            res.statusMessage = response.statusText;
            const responseClone = response.clone();

            // get json response
            try {
                props = await response.json();
            } catch (e) {
                const text = await responseClone.text();
                props = {
                    success: false,
                    errorMessage: res.statusCode !== 200 ? `${res.statusCode} ${res.statusMessage}` : 'Cannot parse JSON',
                    response: text,
                } as any;
                res.statusCode = 500;
            }

            // save props
            if (allowCache && res.statusCode === 200) {
                try {
                    if (!fs.existsSync(cacheFileDir)) {
                        fs.mkdirSync(cacheFileDir);
                    }
                    fs.writeFileSync(cacheFileName, JSON.stringify(props));
                } catch (e) {
                    throw new Error(`Cannot write file ${cacheFileName} ${e}`);
                }
            }
        }
    }

    // ADDITIONAL DATA

    // set url data
    const currentUrl = env.getUrlBase(`/${resolvedUrl}`);
    const currentUrlData = new URL(currentUrl);
    props.url = {
        url: currentUrl,
        canonical: normalizers.urlSlashes(`${currentUrlData.origin}/${currentUrlData.pathname}`),
    };
    // update props time
    props.key = +new Date();

    // add user config
    const requestHeaders = context.req.headers;
    props.userConfig = {
        supportsWebP: (
            (!!requestHeaders && !!requestHeaders.accept && requestHeaders.accept.includes('image/webp'))
            && process.env.USE_WEBP_REPLACE === 'true'
            && process.env.API_IS_REAL === 'true'
        ),
    };

    // rewrite images to webp
    if (props.userConfig.supportsWebP) {
        let jsonString = JSON.stringify(props);
        const cmsUrl = process.env.NEXT_PUBLIC_URL_CMS || '';
        const regex = new RegExp(`${cmsUrl}([^"' ]*\\.(jpg|jpeg|png|gif))`, 'g');
        jsonString = jsonString.replace(regex, `${cmsUrl}$1.webp`);
        props = JSON.parse(jsonString);
    }

    // return data
    return {
        props,
    };
}
