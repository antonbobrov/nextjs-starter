import path from 'path';
import fs from 'fs';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
export const PATHS = {
    config: path.resolve(serverRuntimeConfig.PROJECT_ROOT, 'config.json'),
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

// get site host
let Host = '';
export function getHost () {
    return Host;
}
try {
    const configFile = fs.readFileSync(PATHS.config, {
        encoding: 'utf8',
    });
    const configData = JSON.parse(configFile);
    if (configData) {
        if (configData.host) {
            Host = configData.host;
        }
    }
} catch (e) {
    Host = 'http://localhost:3000/';
}
