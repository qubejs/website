import { utils } from '@qubejs/web-react';
utils.apiBridge.addHeader('tenantCode', 'nybblecore');
utils.apiBridge.events.subscribe('onPrefix', function (data: any) {
  let url = '';
  utils.win.getWindow().APP_CONFIG.apiPrefix && Object.keys(utils.win.getWindow().APP_CONFIG.apiPrefix).forEach((item) => {
    if (!data.url.match(new RegExp('^http', 'i')) && data.url.match(item)) {
      url = utils.win.getWindow().APP_CONFIG.apiPrefix[item].prefix;
    }
  });
  return url;
});
