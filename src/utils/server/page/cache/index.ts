import fs from 'fs';
import path from 'path';
import md5 from 'md5';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const dir = path.join(serverRuntimeConfig.PROJECT_ROOT, '.page-cache', process.env.CONFIG_BUILD_ID || '');

/**
 * Get saved page HTML
 */
export default function getPageHTMLCache (
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
    } catch (e) {
        throw new Error(`Error while reading the file ${filename}`);
    }

    return undefined;
}
