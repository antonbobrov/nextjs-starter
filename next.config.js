const withTM = require('next-transpile-modules')(['vevet', 'vevet-dom'], {
    resolveSymlinks: true,
    debug: true,
});

module.exports = withTM({
    reactStrictMode: true,
    serverRuntimeConfig: {
        PROJECT_ROOT: __dirname,
    },
    trailingSlash: true,
    experimental: {
        esmExternals: 'loose',
    },
    env: {
        API_URL: process.env.API_URL,
        URL: process.env.URL,
    },
});
