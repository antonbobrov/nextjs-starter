import fetch from 'node-fetch';
import { PagePlaceholderResponse } from '../templates/_base/types';
import normalizeUrlSlashes from '../utils/types/normalizeUrlSlashes';

export default function nodeFetch <Response> (
    href: string,
) {
    const normalizedHref = normalizeUrlSlashes(href);
    return new Promise((
        resolve: (response: PagePlaceholderResponse<Response | false>) => void,
    ) => {
        fetch(normalizedHref, {
            method: 'get',
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((value: PagePlaceholderResponse<Response>) => {
                    resolve(value);
                }).catch(() => {
                    resolve({
                        success: false,
                        code: 422,
                        message: `Cant't parse JSON at ${normalizedHref}`,
                        object: false,
                    });
                });
            } else {
                resolve({
                    success: false,
                    code: response.status,
                    message: `${response.statusText} when loading ${normalizedHref}`,
                    object: false,
                });
            }
        }).catch(() => {
            resolve({
                success: false,
                code: 520,
                message: `Unknown error when loading ${normalizedHref}`,
                object: false,
            });
        });
    });
}
