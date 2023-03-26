import { Theme } from '@mui/material/styles';
//
import Alert from './Alert';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(Alert(theme));
}
