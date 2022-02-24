const { withSentryConfig } = require('@sentry/nextjs');

const withTM = require('next-transpile-modules')(['vevet', 'vevet-dom', 'easing-progress'], {
    resolveSymlinks: true,
    debug: false,
});

const headers = require('./headers');

const conf = {
    reactStrictMode: true,
    trailingSlash: true,
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
    async redirects () {
        return [
            {
                source: '/admin/',
                destination: '/',
                permanent: true,
            },
            {
                source: '/media/',
                destination: '/',
                permanent: true,
            },
        ];
    },
    webpack: (config, { webpack, buildId }) => {
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.CONFIG_BUILD_ID': JSON.stringify(buildId),
            }),
        );
        return config;
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
