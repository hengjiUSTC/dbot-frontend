// @mui
import { Box, Card, Stack, Fab, Typography } from '@mui/material';
// utils
// @types
import { IBot } from '@/types/bot';
// components
import Iconify from '@/components/iconify';
import Label from '@/components/label';
import Image from '@/components/image';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

type Props = {
  bot: IBot;
};

export default function BotCard({ bot }: Props) {
  const navigate = useNavigate();
  const { _id, name, image, description } = bot;
  console.log(_id);
  const linkTo = '/';

  const handleGoRoom = () => {
    navigate(`/room/${_id}`);
  };

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', p: 1 }}>
        <Fab
          color="warning"
          size="medium"
          className="add-cart-btn"
          onClick={handleGoRoom}
          sx={{
            right: 16,
            bottom: 16,
            zIndex: 9,
            opacity: 0,
            position: 'absolute',
            transition: (theme) =>
              theme.transitions.create('all', {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
          }}
        >
          <Iconify icon="material-symbols:chat-paste-go-outline" />
        </Fab>

        <Image alt={name} src={image} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      </Box>

      <Stack spacing={2.5} sx={{ p: 3 }}>
        <Typography variant="subtitle2">{name}</Typography>

        <Typography variant="body1">{description}</Typography>
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />

          <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
            {priceSale && (
              <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {fCurrency(priceSale)}
              </Box>
            )}

            <Box component="span">{fCurrency(price)}</Box>
          </Stack>
        </Stack> */}
      </Stack>
    </Card>
  );
}
