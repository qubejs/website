import { default as ApplicationInitializer } from './main.app';
import ice from './styles/themes/ice/ice.theme';
import main from './styles/themes/main/main.theme';
import './styles/themes/main/index.scss';
import './utils';
import './global-events';

const themeMap = {
  main, ice
};

ApplicationInitializer({
  themes: themeMap
});
