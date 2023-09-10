import { createTheme as createMuiTheme } from '@mui/material';
import { createPalette } from './create-palette';
import { createShadows } from './create-shadows';
import { createTypography } from './create-typography';

export function createTheme() {
  const palette = createPalette();
  const shadows = createShadows();
  const typography = createTypography();

  return createMuiTheme({
    breakpoints: {
      values: {
        xs: 450,
        sm: 625,
        md: 991,
        lg: 1290,
        xl: 1440
      }
    },
    palette,
    shadows,
    shape: {
      borderRadius: 8
    },
    typography,
  });

}
