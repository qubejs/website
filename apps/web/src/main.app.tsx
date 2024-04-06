import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { cordova } from '@qubejs/web-react';
import { Provider } from 'react-redux';
import { store } from './redux';
import App from './app/app';
import './styles/themes/main/index.scss';

class AppRoot {
  initialize(config: any) {
    this.bindEvents(config);
  }
  bindEvents(config: any) {
    document.addEventListener(
      'deviceready',
      () => this.onDeviceReady(undefined, config),
      false
    );
  }
  initApp() {
    console.log('initializing app');
  }
  onDeviceReady(direct?: boolean, { themes, ...options }: any = {}) {
    if (!direct) {
      this.initApp();
    }
    // console.log('app initialized')
    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement
    );
    const RouterToUse = cordova.isApp() ? HashRouter : BrowserRouter;
    root.render(
      <RouterToUse>
        <Provider store={store}>
          <App themes={themes} />
        </Provider>
      </RouterToUse>
    );
  }
}

export default (config: any = {}) => {
  if (cordova.isApp()) {
    new AppRoot().initialize(config);
  } else {
    new AppRoot().onDeviceReady(true, config);
  }
  const setFullHeight = () => {
    const item: any = document.querySelector(':root');
    item?.style?.setProperty('--vh', window.innerHeight / 100 + 'px');
  };
  window.addEventListener('resize', () => {
    setFullHeight();
  });
  setFullHeight();
};
