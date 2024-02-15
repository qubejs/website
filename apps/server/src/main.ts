/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { ContentServer } from '@qubejs/cms';
import siteConfig from '../site.config';
import config from '../config/environment';
import appConfig from '../config/app-config';
const app = express();

app.use(express.static(path.join(__dirname, 'assets')));

console.log(path.join(__dirname, 'content'));
// Content server
var cmsSever = new ContentServer(
  {
    contentPath: path.join(__dirname, 'content'),
    serverPath: '/content/*',
    rootApp: path.join(__dirname),
    damAssets: path.join(__dirname, 'dam'),
    clientLibs: path.join(__dirname, 'clientlibs'),
    userData: () => {
      return {
        tenantCode: process.env.TENANT_CODE || 'NOT_DEFINED',
        sitekey: process.env.sitekey || 'NOT_DEFINED',
      };
    },
    appConfig,
    envConfig: config,
    mode: config.env,
    siteConfig: siteConfig,
  },
  app
);
cmsSever.init();

const port = process.env.PORT || 4610;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/content/en/home`);
});
server.on('error', console.error);
