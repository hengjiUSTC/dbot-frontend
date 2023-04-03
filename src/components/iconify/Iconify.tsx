import React, { forwardRef } from 'react';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box, BoxProps } from '@mui/material';
//
import { IconifyProps } from './types';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  icon: IconifyProps;
  sx?: object;
  width?: any;
}

const Iconify = forwardRef<SVGElement, Props>(({ icon, width = 20, sx, ...other }, ref) => (
  <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
));

Iconify.displayName = 'Iconify';

export default Iconify;
