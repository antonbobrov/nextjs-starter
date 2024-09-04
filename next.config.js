/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { withSentryConfig } = require('@sentry/nextjs');
const webpackClassNameObfscation = require('./config/webpackClassNameObfscation');

const rewrites = require('./config/rewrites');

const ASSETS_PREFIX = process.env.NEXT_PUBLIC_ASSETS_PREFIX;

/** @type {import('next').NextConfig} */
const baseConfig = {
  assetPrefix: ASSETS_PREFIX,
  i18n: {
    locales: ['default', 'en', 'de'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  images: {
    minimumCacheTTL: 3600 * 24 * 365,
    deviceSizes: [480, 560, 640, 750, 1024, 1440, 1920, 2560],
    imageSizes: [480, 560, 640, 750, 1024, 1440, 1920, 2560],
  },
  rewrites: () => rewrites,
  webpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      webpackClassNameObfscation(config);
    }

    if (process.env.ANALYZE) {
      config.optimization.concatenateModules = false;
    }

    return config;
  },
};

const withAnalyzer = withBundleAnalyzer(baseConfig);

// eslint-disable-next-line @typescript-eslint/naming-convention
const HAS_SENTRY =
  !!process.env.SENTRY_AUTH_TOKEN &&
  !!process.env.SENTRY_ORG &&
  !!process.env.SENTRY_PROJECT &&
  process.env.NODE_ENV === 'production';

module.exports = HAS_SENTRY
  ? withSentryConfig(withAnalyzer, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      silent: !process.env.CI,
      widenClientFileUpload: true,
      reactComponentAnnotation: {
        enabled: true,
      },
      hideSourceMaps: true,
      disableLogger: true,
      automaticVercelMonitors: true,
    })
  : withAnalyzer;
