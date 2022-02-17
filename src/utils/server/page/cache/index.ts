import fs from 'fs';
import path from 'path';
import md5 from 'md5';

const dir = path.join(process.cwd(), '.page-cache');

/**
 * Get saved page HTML
 */
export function getPageHTMLCache (
    href: string,
) {
    const filename = path.join(dir, md5(href));
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        if (fs.existsSync(filename)) {
            const contents = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' }) || '';
            return contents;
        }
        return undefined;
    } catch (e) {
        throw new Error(`Error while reading the file ${filename}`);
    }
}

/**
 * Update page HTML cache
 */
export async function updatePageHTMLCache (
    url: URL,
) {
    try {
        const html = await fetchPageHTMLCache(url);
        setPageHTMLCache(url.pathname + url.search, html);
    } catch (e) {
        throw new Error(`Can't update html cache for ${url.href}`);
    }
}

/**
 * Save page HTML
 */
export function setPageHTMLCache (
    href: string,
    html: string,
) {
    const filename = path.join(dir, md5(href));
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        fs.writeFileSync(filename, html);
    } catch (e) {
        throw new Error(`Error while reading the file ${filename}`);
    }
}

/**
 * Fetch page HTML
 */
export async function fetchPageHTMLCache (
    url: URL,
) {
    try {
        const res = await fetch(url.href);
        const text = await res.text();
        return text;
    } catch (e) {
        throw new Error(`Can't fetch ${url.href}`);
    }
}
