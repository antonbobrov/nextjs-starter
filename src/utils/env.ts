import normalizeUrlSlashes from './data/normalizeUrlSlashes';

export function getEnvUrlBase (
    postfix = '',
) {
    const url = process.env.NEXT_PUBLIC_URL_BASE || 'http://localhost:3000/';
    return normalizeUrlSlashes(`${url}/${postfix}`);
}

export function getEnvUrlApi (
    postfix = '',
) {
    const url = process.env.NEXT_PUBLIC_URL_API || 'http://localhost:3000/api/';
    return normalizeUrlSlashes(`${url}/${postfix}`);
}

export function getEnvUrlApiPage (
    postfix = '',
) {
    const url = process.env.NEXT_PUBLIC_URL_API_PAGE || 'http://localhost:3000/api/page/';
    return normalizeUrlSlashes(`${url}/${postfix}`);
}
