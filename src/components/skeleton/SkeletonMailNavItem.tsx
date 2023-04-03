// @mui
import { Stack, Skeleton, StackProps } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonMailNavItem({ sx, ...other }: StackProps) {
  return (
    <Stack spacing={1} direction="row" alignItems="center" sx={{ px: 3, py: 1, ...sx }} {...other}>
      <Skeleton variant="circular" width={32} height={32} />
      <Skeleton variant="text" sx={{ width: 0.5, height: 16 }} />
    </Stack>
  );
}
