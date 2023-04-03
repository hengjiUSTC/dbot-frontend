// @mui
import { Stack, Skeleton, StackProps } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonConversationItem({ sx, ...other }: StackProps) {
  return (
    <Stack
      spacing={1}
      direction="row"
      alignItems="center"
      sx={{ px: 3, py: 1.5, ...sx }}
      {...other}
    >
      <Skeleton variant="circular" width={48} height={48} />

      <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" sx={{ width: 0.5, height: 16 }} />
        <Skeleton variant="text" sx={{ width: 0.25, height: 12 }} />
      </Stack>
    </Stack>
  );
}
