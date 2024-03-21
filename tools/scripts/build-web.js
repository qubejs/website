const { ArgsReader, WebBuild } = require('@qubejs/scripts');
const paths = require('./paths');
const paramsEnv = new ArgsReader().get();
const env = paramsEnv.env || 'production';
const config = require('../../apps/server/config/environment');
process.env.CONFIG_ENV = env;

const sendAppConfig = require('../../apps/server/config/app-config');
const chalk = require('chalk');

const distWeb =
  paramsEnv.server === 'true' ? paths.distServerAssets : paths.distWeb;

console.log(chalk.green('env = ' + env));
console.log(chalk.yellow('building web'));
const objBuilder = new WebBuild({
  version: sendAppConfig.appVersion,
  indexHtml: distWeb + '/index.html',
  appConfig: {
    ...sendAppConfig,
    source: 'Web',
  },
  publicUrl: sendAppConfig.publicUrl,
  scripts: `
  <script
  async
  src="https://www.googletagmanager.com/gtag/js?id=${config.analytics.gaTrackingId}"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', '${config.analytics.gaTrackingId}');
</script>
  `,
});

objBuilder.process().then(() => {
  console.log(chalk.green('web build process completed'));
});
