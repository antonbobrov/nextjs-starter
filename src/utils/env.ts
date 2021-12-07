import normalizers from '@/utils/normalizers';

function getUrlBase (
    postfix = '',
) {
    const url = process.env.NEXT_PUBLIC_URL_BASE || 'http://localhost:3000/';
    return normalizers.urlSlashes(`${url}/${postfix}`);
}

function getUrlApi (
    postfix = '',
) {
    const url = process.env.NEXT_PUBLIC_URL_API || 'http://localhost:3000/api/';
    return normalizers.urlSlashes(`${url}/${postfix}`);
}

function getUrlApiPage (
    postfix = '',
) {
    const url = process.env.NEXT_PUBLIC_URL_API_PAGE || 'http://localhost:3000/api/page/';
    return normalizers.urlSlashes(`${url}/${postfix}`);
}



const env = {
    getUrlBase,
    getUrlApi,
    getUrlApiPage,
};

export default env;
