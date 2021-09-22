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
});
