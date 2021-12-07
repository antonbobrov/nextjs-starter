const { withSentryConfig } = require('@sentry/nextjs');

const withTM = require('next-transpile-modules')(['vevet', 'vevet-dom', 'easing-progress'], {
    resolveSymlinks: true,
    debug: false,
});

const headers = require('./headers');

const conf = {
    env: {
        NEXT_PUBLIC_URL_BASE: process.env.NEXT_PUBLIC_URL_BASE,

        NEXT_PUBLIC_URL_CMS: process.env.NEXT_PUBLIC_URL_CMS,
        NEXT_PUBLIC_URL_API: process.env.NEXT_PUBLIC_URL_API,
        NEXT_PUBLIC_URL_API_PAGE: process.env.NEXT_PUBLIC_URL_API_PAGE,
        API_KEY: process.env.API_KEY,
        API_IS_REAL: process.env.API_IS_REAL,

        NOINDEX: process.env.NOINDEX,
        SSP_CACHE: process.env.SSP_CACHE,
        USE_WEBP_REPLACE: process.env.USE_WEBP_REPLACE,

        SENTRY_DSN: process.env.SENTRY_DSN,
        SENTRY_ORG: process.env.SENTRY_ORG,
        SENTRY_PROJECT: process.env.SENTRY_PROJECT,
        SENTRY_AUTH: process.env.SENTRY_AUTH,
    },
    reactStrictMode: true,
    trailingSlash: true,
    serverRuntimeConfig: {
        PROJECT_ROOT: __dirname,
    },
    experimental: {
        esmExternals: 'loose',
    },
    async headers () {
        return [
            {
                source: '/(.*)',
                headers,
            },
        ];
    },
};

// check if need to load sentry
const {
    SENTRY_DSN, SENTRY_ORG,
    SENTRY_PROJECT, SENTRY_AUTH,
} = process.env;
if (
    process.env.NODE_ENV !== 'development'
    && !!SENTRY_DSN && !!SENTRY_ORG
    && !!SENTRY_PROJECT && !!SENTRY_AUTH
) {
    module.exports = withSentryConfig(
        withTM(conf),
        {
            org: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH,
            sourceMapReference: true,
        },
    );
} else {
    module.exports = withTM(conf);
}
