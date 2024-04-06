// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
  useParams,
  // RouterProvider,
  // createHashRouter,
} from 'react-router-dom';
import {
  containers,
  storage,
  reducers,
  utils,
  plugins,
} from '@qubejs/web-react';
import { ThemeProvider } from '@qubejs/ui-material-base/theme.esm';
import * as uiMaterial from '@qubejs/ui-material-base/basic.esm';
import app_containers from '../containers';
import app_templates from '../templates';
import config from '../config';
import Content from '../templates/Content';

const { closeNotification, closePopup, closePopupScreen } = reducers.common;
const { initApplication, selectUserData } = reducers.content;

const { DynamicContent, Application } = containers;
plugins.register(uiMaterial);
storage.components.set({
  CheckboxField: uiMaterial.components.Checkbox,
});
storage.containers.set(containers);
storage.containers.set(app_containers);
storage.containers.set(app_templates);
utils.redirect.setUrlMapping(config.urlMapping);
import('@qubejs/ui-material-base/data.esm').then((uiMaterial) => {
  plugins.register(uiMaterial);
});
import('@qubejs/ui-material-base/content.esm').then((uiMaterial) => {
  plugins.register(uiMaterial);
});
import('@qubejs/ui-material-base/advanced.esm').then((uiMaterial) => {
  plugins.register(uiMaterial);
});
import('@qubejs/ui-material-base/editing.esm').then((uiMaterial) => {
  plugins.register(uiMaterial);
});
import('@qubejs/ui-material-base/files.esm').then((uiMaterial) => {
  plugins.register(uiMaterial);
});
import('@qubejs/ui-material-base/visualization.esm').then((uiMaterial) => {
  plugins.register(uiMaterial);
});
export function App({ themes, props, appStore, appActions }: any) {
  const navigate = useNavigate();
  const params = useParams();
  const [currentTheme, setTheme] = useState('main');
  const [inProgress, setInProgress] = useState(true);
  const { Snackbar } = storage.components.get();
  const location = useLocation();
  const userData = selectUserData(appStore);
  useEffect(() => {
    utils.redirect.setNavigate(navigate);
    appActions.initApplication(config).then(() => {
      setInProgress(false);
    });
  }, []);
  const onThemeChange = (newTHeme: string) => {
    const preFix =
      utils.win.getWindow().APP_CONFIG.environment === 'development' ? '' : '';
    if (newTHeme !== currentTheme) {
      console.log(`${currentTheme} changed to : ${newTHeme}`);
      setTheme(newTHeme);
      setInProgress(true);
      let itemFound;
      let regExMatch: any;
      for (let i = 0; i < document.head.children.length; i++) {
        const item = document.head.children[i] as HTMLLinkElement;
        regExMatch = item.href?.match('(.*).([0-9].[0-9].[0-9].css)$');
        if (item?.tagName === 'LINK' && item?.href && regExMatch) {
          itemFound = item;
          break;
        }
      }
      console.log(regExMatch);
      if (itemFound && currentTheme !== regExMatch[1]) {
        itemFound.setAttribute(
          'href',
          [`${preFix}${currentTheme}.`, regExMatch[2]].join('')
        );
        document.head.appendChild(itemFound);
      } else {
        const elem = document.createElement('link');
        elem.setAttribute('rel', `stylesheet`);
        elem.setAttribute(
          'href',
          `${preFix}${newTHeme}.${
            utils.win.getWindow().APP_CONFIG.appVersion
          }.css`
        );
        document.head.appendChild(elem);
      }
      setTimeout(() => {
        setInProgress(false);
      }, 500);
    }
  };
  useEffect(() => {
    // Promise.all([
    // import('@qubejs/ui-material-base/basic.esm').then((uiMaterial) => {
    //   plugins.register(uiMaterial);
    // }),
    // import('@qubejs/ui-material-base/files.esm').then((uiMaterial) => {
    //   plugins.register(uiMaterial);
    // });
    // import('@qubejs/ui-material-base/visualization.esm').then((uiMaterial) => {
    //   plugins.register(uiMaterial);
    // });
    // ]).then(() => {
    // });
  }, []);
  // console.log(themes);
  utils.win.getWindow().APP_CONFIG?.MODE === 'development' && console.log('appStore', appStore, userData);
  return (
    <div>
      {!inProgress && (
        <ThemeProvider theme={themes[currentTheme]}>
          <Application>
            <Content>
              <Routes>
                {/* <Route path="/" element={<NxWelcome title='Hello' />} /> */}
                <Route
                  path="/content/*"
                  element={
                    <DynamicContent {...props} onThemeChange={onThemeChange} />
                  }
                />
                <Route path="*" element={<Navigate to={`${userData.defaultRedirect?.default || "/content/dynamic/home"}`} />} />
              </Routes>
            </Content>
          </Application>
        </ThemeProvider>
      )}
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
