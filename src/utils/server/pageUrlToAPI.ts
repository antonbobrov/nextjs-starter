import normalizeUrlSlashes from '../data/normalizeUrlSlashes';

export default function pageUrlToAPI (url: URL) {
    return normalizeUrlSlashes(`${url.origin}/api/page/${url.pathname}${url.search}`);
}
