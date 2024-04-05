// import packageJson from '@qubejs/source/package.json';
const config = require('./environment');
const siteConfig = require('../site.config');
const packageJson = require('../../../package.json');

module.exports = {
  appVersion: process.env.VERSION || packageJson.version,
  apiPrefix: config.apiPrefix,
  environment: config.env,
  tenantCode: config.tenantCode,
  siteMap: siteConfig,
  publicUrl: config.publicUrl,
  module: 'qubejs',
};
