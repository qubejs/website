export default {
  globals: {
    path: '/content/root',
  },
  urls: {
    protected: ['/content/app/*', '/content/dynamic/app/*'],
  },
  urlMapping: {
    homeDashboard: '/content/app/home',
    '/content/(.*)': {
      type: 'regex',
      target: '/content/$1',
    },
  },
};
