import { Helmet } from 'react-helmet-async';
// @mui
import { Backdrop, CircularProgress, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Room from '@/sections/room/Room/Room';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useDispatch, useSelector } from '@/redux/store';
import { clearBot, getBotInfo } from '@/redux/slices/chat';

export default function RoomPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { bot } = useSelector((state) => state.chat);

  useEffect(() => {
    if (id) {
      if (bot && bot._id !== id) {
        dispatch(clearBot());
      }
      dispatch(getBotInfo(id));
    }
  }, []);

  const loading = (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
  return (
    <>
      <Helmet>
        <title>Room</title>
      </Helmet>
      <Container>
        <CustomBreadcrumbs
          heading="Chat Room"
          links={[
            {
              name: 'Home',
              href: '/',
            },
            { name: 'chat room' },
          ]}
        />
      </Container>
      <Container sx={{ height: '75vh', paddingBottom: 5 }}>
        {bot ? <Room bot={bot} /> : loading}
      </Container>
    </>
  );
}
