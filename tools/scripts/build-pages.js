const path = require('path');
const { StaticContentBuilder } = require('@qubejs/cms');
const paths = require('./paths');
const config = require('../../apps/server/config/environment');
const appConfig = require('../../apps/server/config/app-config');
const siteConfig = require('../../apps/server/site.config');

new StaticContentBuilder({
  serverConfig: {
    contentPath: path.resolve('apps/server/src/content'),
    rootApp: path.resolve('apps/server/src'),
    serverPath: '/content/*',
    siteConfig,
    appConfig: {
      ...appConfig,
      source: 'Web',
    },
    damAssets: path.resolve('apps/server/src/dam'),
    clientLibs: path.resolve('apps/server/src/clientlibs'),
    envConfig: config,
    mode: 'production',
  },
  output: paths.distWeb,
  ignoreFolder: process.env.PUBLIC_URL?.substr(1),
})
  .build()
  .then(() => {
    console.log('--> content process done');
  });
  