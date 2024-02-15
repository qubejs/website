import { utils } from '@qubejs/web-react';
import { ReactComponent as Logo } from '../digital-assets/svg/logo.svg';
import { ReactComponent as LogoWide } from '../digital-assets/svg/logo-wide.svg';
import { ReactComponent as LogoMuted } from '../digital-assets/svg/logo-muted.svg';

utils.storage.icons.set({
  logo: Logo,
  'logo-wide': LogoWide,
  'logo-muted': LogoMuted,
});
