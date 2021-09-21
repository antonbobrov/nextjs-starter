import normalizeUrlSlashes from './data/normalizeUrlSlashes';

export function getEnvUrl () {
    return normalizeUrlSlashes(process.env.URL || 'http://localhost:3000/');
}

export function getEnvApiUrl () {
    return normalizeUrlSlashes(process.env.API_URL || `${getEnvUrl()}/api/`);
}

export function getEnvApiPageUrl () {
    return normalizeUrlSlashes(`${getEnvApiUrl()}/page/`);
}
