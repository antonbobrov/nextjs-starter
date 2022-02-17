/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import md5 from 'md5';

const dir = path.join(process.cwd(), '.page-cache');

/**
 * Get saved page HTML
 */
export default function getPageHTMLCache (
    href: string,
) {
    const filename = path.join(dir, md5(href));
    console.log(dir);
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
