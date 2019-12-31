const withOffline = moduleExists('next-offline') ? require('next-offline') : {};

const nextConfig = {
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  crossOrigin: 'anonymous',
  target: 'serverless',
  env: {
    API_URL: process.env.API_URL,
    STRIPE_PUBLIC_KEY: process.env.DEVGULP_STRIPE_PUBLIC_KEY_TEST,
  },
};

function moduleExists(name) {
  try {
    return require.resolve(name);
  } catch (error) {
    return false;
  }
}

require('dotenv-defaults').config();

module.exports = moduleExists('next-offline')
  ? withOffline(nextConfig)
  : nextConfig;
