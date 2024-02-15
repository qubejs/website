// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
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
import { containers, storage, utils, ThemeProvider } from '@qubejs/web-react';
import { Provider } from 'react-redux';
// import { ThemeProvider } from '@emotion/react';
import app_containers from '../containers';
import app_templates from '../templates';
import { useEffect } from 'react';
import { store } from '../redux';
import config from '../../config';
import theme from '../styles/themes/main/main.theme';

const { DynamicContent } = containers;

storage.containers.set(containers);
storage.containers.set(app_containers);
storage.containers.set(app_templates);
console.log(storage.containers);
utils.redirect.setUrlMapping(config.urlMapping);
const setFullHeight = () => {
  utils.win.getWindow().document.querySelector(':root').style.setProperty('--vh', window.innerHeight / 100 + 'px');
};
window.addEventListener('resize', () => {
  setFullHeight();
});
setFullHeight();
export function App() {
  const navigate = useNavigate();
  const params = useParams();
  const { Snackbar } = storage.components.get();
  const location = useLocation();
  useEffect(() => {
    utils.redirect.setNavigate(navigate);
  }, []);
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div className="app-main container-fluid">
            <Routes>
              {/* <Route path="/" element={<NxWelcome title='Hello' />} /> */}
              <Route
                path="/content/*"
                element={<DynamicContent location={location} params={params} />}
              />
              <Route path="*" element={<Navigate to="/content/en/home" />} />
            </Routes>
          </div>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
