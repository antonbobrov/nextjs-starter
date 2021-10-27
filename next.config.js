const { withSentryConfig } = require('@sentry/nextjs');

const withTM = require('next-transpile-modules')(['vevet', 'vevet-dom'], {
    resolveSymlinks: true,
    debug: true,
});

const headers = require('./headers');

const conf = {
    env: {
        NEXT_PUBLIC_URL_BASE: process.env.NEXT_PUBLIC_URL_BASE,
        NEXT_PUBLIC_NOINDEX: process.env.NEXT_PUBLIC_NOINDEX,

        NEXT_PUBLIC_URL_API: process.env.NEXT_PUBLIC_URL_API,
        NEXT_PUBLIC_URL_API_PAGE: process.env.NEXT_PUBLIC_URL_API_PAGE,
        API_KEY: process.env.API_KEY,
        IS_REAL_API: process.env.IS_REAL_API,

        NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
        NEXT_PUBLIC_SENTRY_ORG: process.env.NEXT_PUBLIC_SENTRY_ORG,
        NEXT_PUBLIC_SENTRY_PROJECT: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
        NEXT_PUBLIC_SENTRY_AUTH: process.env.NEXT_PUBLIC_SENTRY_AUTH,
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
    webpack: (config) => {
        if (process.env.NODE_ENV !== 'development') {
            config.module.rules.forEach(({ oneOf }) => {
                if (oneOf) {
                    oneOf.forEach(({ use }) => {
                        if (!!use && use.forEach) {
                            use.forEach(({ options: { modules } }) => {
                                if (modules) {
                                    if (modules.getLocalIdent) {
                                        delete modules.getLocalIdent;
                                        modules.localIdentName = '[hash:base64:4]';
                                    }
                                }
                            });
                        }
                    });
                }
            });
        }

        return config;
    },
};

// check if need to load sentry
const {
    NEXT_PUBLIC_SENTRY_DSN, NEXT_PUBLIC_SENTRY_ORG,
    NEXT_PUBLIC_SENTRY_PROJECT, NEXT_PUBLIC_SENTRY_AUTH,
} = process.env;
if (
    process.env.NODE_ENV !== 'development'
    && !!NEXT_PUBLIC_SENTRY_DSN && !!NEXT_PUBLIC_SENTRY_ORG
    && !!NEXT_PUBLIC_SENTRY_PROJECT && !!NEXT_PUBLIC_SENTRY_AUTH
) {
    module.exports = withSentryConfig(
        withTM(conf),
        {
            org: process.env.NEXT_PUBLIC_SENTRY_ORG,
            project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
            authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH,
            sourceMapReference: true,
        },
    );
} else {
    module.exports = withTM(conf);
}
