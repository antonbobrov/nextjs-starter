// eslint-disable-next-line import/no-extraneous-dependencies
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const headers = require('./config/headers');
const rewrites = require('./config/rewrites');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  experimental: {
    esmExternals: 'loose',
  },
  transpilePackages: [
    '@anton.bobrov/vevet-init',
    '@anton.bobrov/react-vevet-hooks',
    '@anton.bobrov/react-components',
    'vevet',
    'p-cancelable',
  ],
  compiler: {
    styledComponents: true,
  },
  headers() {
    return [
      {
        source: '/(.*)',
        headers,
      },
    ];
  },
  rewrites: () => rewrites,
  webpack: (config, { webpack, buildId }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.CONFIG_BUILD_ID': JSON.stringify(buildId),
      })
    );

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
