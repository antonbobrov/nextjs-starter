export default function normalizeUrlSlashes (
    url: string,
) {
    return url.replace(/([^:]\/)\/+/g, '$1');
}
