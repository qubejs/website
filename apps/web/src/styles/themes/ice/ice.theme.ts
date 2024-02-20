import { createTheme } from '@mui/material/styles';
import variables from './abstract/variables.module.scss';

const colors = {
  primary: variables.brandPrimary,
  primaryDark: variables.brandPrimary,
  error: variables.error,
  errorDarker: variables.errorDarker,
  success: variables.success,
  successDarker: variables.successDarker,
  info: variables.info,
  infoDarker: variables.infoDarker,
  warning: variables.warning,
  warningDarker: variables.warningDarker,
  primaryLight: variables.brandPrimaryLight,
  primaryContrast: '#fff',
  secondary: variables.brandSecondary,
  secondaryDark: variables.brandSecondaryDark,
  secondaryLight: variables.brandSecondaryLight,
  secondaryContrast: '#fff',
};

export { colors };

export default createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.MuiInputLabel-root': {
            lineHeight: 1.2,
            transformOrigin: 'bottom left',
            marginTop: '-3px',
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        input: {
          padding: '2px !important',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {},
        input: {
          padding: '10px',
        },
      },
    },
    MuiPaper: {
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }: any) => {
          const styles: any = { textTransform: 'unset' };
          if (ownerState.size === 'large') {
            styles.padding = '10px 40px';
          }
          return styles;
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: variables.brandPrimary,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: variables.brandPrimaryDarker,
          },
        },
        label: {
          '&.Mui-selected': {
            color: '#fff',
          },
          color: '#e2e2e2',
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        marginNormal: {
          'margin-top': '0px',
          'margin-bottom': '20px',
        },
      },
    },
  },
  palette: {
    primary: {
      main: variables.brandPrimary,
      light: variables.brandPrimaryLight,
      dark: variables.brandPrimaryDarkest,
      contrastText: colors.primaryContrast,
    },
    secondary: {
      main: colors.secondary,
      light: colors.secondaryLight,
      dark: colors.secondaryDark,
      contrastText: colors.secondaryContrast,
    },
  },
  typography: {
    fontFamily: 'Lato-Light',
    fontSize: 12,
  },
});
