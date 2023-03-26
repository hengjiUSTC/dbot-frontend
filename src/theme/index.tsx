import { useMemo } from 'react';
// @mui
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline, ThemeOptions } from '@mui/material';
//
import palette from './palette';
import shadows from './shadows';
import typography from './typography';
import customShadows from './customShadows';
import componentsOverride from './overrides';
// ----------------------------------------------------------------------

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 6 },
      typography,
      direction: 'ltr',
      shadows: shadows(),
      customShadows: customShadows(),
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
