module.exports = [
  process.env.API_URL
    ? {
        source: '/api/:path*',
        destination: `${process.env.API_URL}:path*`,
      }
    : {
        source: '/api/:path*',
        destination: '/api/mock/:path*',
      },
];
