// @mui
import { Box, BoxProps } from '@mui/material';
// @type
// components
import { SkeletonProductItem } from '@/components/skeleton';
//
import BotCard from './BotCard';
import { IBot } from '@/types/bot';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  bots: IBot[];
  loading: boolean;
}

export default function BotsList({ bots, loading, ...other }: Props) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
      {...other}
    >
      {(loading ? [...Array(12)] : bots).map((product, index) =>
        product ? <BotCard key={index} bot={product} /> : <SkeletonProductItem key={index} />
      )}
    </Box>
  );
}
