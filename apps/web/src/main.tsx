import { default as ApplicationInitializer } from './main.app';
import main from './styles/themes/main/main.theme';
import ice from './styles/themes/ice/ice.theme';
import './styles/themes/main/index.scss';
import './utils';
import './global-events';

const themeMap = {
  main, ice
};

ApplicationInitializer({
  themes: themeMap
});
