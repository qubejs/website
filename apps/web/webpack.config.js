require('dotenv').config();
const path = require('path');
const chalk = require('chalk');
const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const packageJson = require('../../package.json');

const VERSION = process.env.VERSION || packageJson.version;
// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  if (VERSION) {
    console.log(chalk.green('building for version:') + chalk.cyan(VERSION));
    config.output.filename = `[name]${VERSION ? `.${VERSION}` : ''}.js`;
    config.output.chunkFilename = `[name]${VERSION ? `.${VERSION}` : ''}.js`;
    const plugin = config.plugins.find(
      (item) => item?.constructor?.name === 'MiniCssExtractPlugin'
    );
    console.log(plugin)
    plugin.options.filename = `[name]${VERSION ? `.${VERSION}` : ''}.css`;
    plugin.options.chunkFilename = `[name]${VERSION ? `.${VERSION}` : ''}.css`;
  }
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  const typescss = config.module.rules.filter((i) => '.scss'.match(i.test))[0];
  // console.log(typescss);
  const scssMod = typescss.oneOf.filter((i) => '.scss'.match(i.test))[0];
  // scssMod.use[1].options.importLoaders = 1;
  // scssMod.use[1].options.modules = {
  //   compileType: 'icss',
  // };
  // console.log(config.module.rules);
  // console.log(scssMod.use[1]);
  const typeWeb = scssMod.use[3].options;
  typeWeb.additionalData = (content, loaderContext) => {
    if (
      loaderContext.resourcePath.endsWith(
        `themes\\main\\abstract\\_variables.scss`
      ) ||
      loaderContext.resourcePath.endsWith(
        `themes/main/abstract/_variables.scss`
      )
    ) {
      return content;
    }
    return `
       @import "apps/web/src/styles/themes/main/abstract/_variables.scss";
      @import "apps/web/src/styles/mixins/index.scss";
    ${content}
  `;
  };
  // console.log(typeWeb.sassOptions.includePaths);
  // console.log(path.resolve('apps/web/src/styles'));
  typeWeb.sassOptions.includePaths.push(path.resolve('apps/web/src/styles'));
  // typeWeb.sassOptions.includePaths.push(path.resolve('apps'));
  return config;
});
