import path from 'path';
import fs from 'fs';

export const PATHS = {
    config: path.resolve(__dirname, '..', '..', '..', 'config.json'),
};

// get pages rest api server url
let PagesApiUrl = '';
export function getPagesApiUrl () {
    return PagesApiUrl;
}
try {
    const configFile = fs.readFileSync(PATHS.config, {
        encoding: 'utf8',
    });
    const configData = JSON.parse(configFile);
    if (configData) {
        if (configData.apiPages) {
            PagesApiUrl = configData.apiPages;
        }
    }
} catch (e) {
    PagesApiUrl = 'http://localhost:3000/api/page-placeholder';
}
