const urlMapping: any = {
    home: '/content/en/home',
    '/content/(.*)': {
      type: 'regex',
      target: '/content/$1',
    },
  };
  const urls: any = {
    protected: ['/content/app/*', '/content/dynamic/app/*'],
  };
  export default {
    globals: {
      path: '/content/root',
    },
    urls,
    urlMapping,
  };
  export { urlMapping };
  