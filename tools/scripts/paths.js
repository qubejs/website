const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

// config after eject: we're in ./config/
module.exports = {
  webSrc: resolveApp('apps/web/src'),
  docsDist: resolveApp('docs/dist'),
  server: resolveApp('apps/server'),
  dist: resolveApp('dist'),
  serverAssets: resolveApp('apps/server/src/assets'),
  distWeb: resolveApp('dist/apps/web'),
  distServerAssets: resolveApp('dist/apps/server/assets'),
  webStyles: resolveApp('apps/web/src/styles'),
  webAssets: resolveApp('apps/web/src/assets'),
};
