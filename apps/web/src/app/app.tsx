// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';
import { connect } from 'react-redux';

import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import {
  containers,
  storage,
  reducers,
  utils,
  ThemeProvider,
} from '@qubejs/web-react';
import config from '../config';

import app_components from '../components';
import app_containers from '../containers';
import app_templates from '../templates';
import { useEffect } from 'react';
import Content from '../templates/Content';

const { DynamicContent, Application } = containers;
const { apiBridge, redirect } = utils;

const { closeNotification, closePopup, closePopupScreen } = reducers.common;
const { initApplication } = reducers.content;

const { redirectTo } = redirect;

storage.containers.set(containers);
storage.containers.set(app_containers);
storage.containers.set(app_templates);
storage.components.set(app_components);
utils.redirect.setUrlMapping(config.urlMapping);
utils.setErrorCodes({
  UNAUTHORIZE_CODE: 401,
  LOGIN_FAILED: 403,
});

export function App({ appActions, themes, ...props }: any) {
  const navigate = useNavigate();
  const [currentTheme, setTheme] = useState('main');
  const [inProgress, setInProgress] = useState(false);
  const onUnauthroized = () => {
    console.log('unauthorize');
  };

  useEffect(() => {
    utils.redirect.setNavigate(navigate);
    apiBridge.events.subscribe('onUnauthroized', onUnauthroized);
    const token = utils.cookie.get('token');
    utils.apiBridge.addHeader(
      'tenantCode',
      utils.win.getWindow().APP_CONFIG.tenantCode
    );
    if (token) {
      utils.apiBridge.addHeader('Authorization', `Bearer ${token}`);
    }
    appActions.initApplication(config);
  }, []);
  const onThemeChange = (newTHeme: string) => {
    if (newTHeme !== currentTheme) {
      console.log(`${currentTheme} changed to : ${newTHeme}`);
      setTheme(newTHeme);
      setInProgress(true);
      let itemFound;
      let regExMatch: any;
      for (let i = 0; i < document.head.children.length; i++) {
        const item = document.head.children[i] as HTMLLinkElement;
        let stringHref = (item.href || '');
        stringHref = stringHref.substr(stringHref.indexOf('/') > -1 ? stringHref.lastIndexOf('/') + 1 : 0);
        regExMatch = stringHref?.match('(.*).([0-9].[0-9].[0-9].css)$');
        if (item?.tagName === 'LINK' && stringHref && regExMatch) {
          itemFound = item;
          break;
        }
      }
      if (regExMatch && itemFound && currentTheme !== regExMatch[1]) {
        itemFound.setAttribute(
          'href',
          [`${newTHeme}.`, regExMatch[2]].join('')
        );
        document.head.appendChild(itemFound);
      } else {
        const elem = document.createElement('link');
        elem.setAttribute('rel', `stylesheet`);
        elem.setAttribute(
          'href',
          `${newTHeme}.${utils.win.getWindow().APP_CONFIG.appVersion}.css`
        );
        document.head.appendChild(elem);
      }
      setTimeout(() => {
        setInProgress(false);
      }, 500);
    }
  };
  return (
    <div>
      <ThemeProvider theme={themes[currentTheme]}>
        <Content>
          <Application>
            <Routes>
              <Route
                path="/content/*"
                element={
                  <DynamicContent {...props} onThemeChange={onThemeChange} />
                }
              />
              <Route path="*" element={<Navigate to="/content/en/home" />} />
            </Routes>
          </Application>
        </Content>
      </ThemeProvider>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    appStore: state,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    appActions: {
      initApplication: (data: any) => dispatch(initApplication(data)),
      closeNotification: () => dispatch(closeNotification()),
      closePopup: () => dispatch(closePopup()),
      closePopupScreen: () => dispatch(closePopupScreen()),
    },
    raiseAction: dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
