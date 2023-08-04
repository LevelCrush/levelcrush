/** @type {import('next').NextConfig} */

module.exports = {
  basePath: '/',
  reactStrictMode: true,
  images: {
    domains: ['http.cat'],
  },
  optimizeFonts: false,
  async redirects() {
    return [
      {
        source: '/signups',
        destination: '/signup',
        permanent: false,
      },
      {
        source: '/tournament',
        destination: '/tournament/matchups',
        permanent: false,
      },

      {
        source: '/tournament/matchup',
        destination: '/tournament/matchups',
        permanent: false,
      },
      {
        source: '/tournament/rule',
        destination: '/tournament/rules',
        permanent: false,
      },
      {
        source: '/guides',
        destination: '/guides/destiny2/votd',
        permanent: false,
      },
      {
        source: '/guides/destiny2',
        destination: '/guides/destiny2/votd',
        permanent: false,
      },
    ];
  },
};
