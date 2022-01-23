import path from 'path';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const serverSettings = {
    cacheDir: path.join(serverRuntimeConfig.PROJECT_ROOT, '.ssp-cache'),
};

export default serverSettings;
