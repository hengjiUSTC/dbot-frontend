import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Container } from '@mui/material';
import Footer from '@/layouts/main/Footer';
import { useDispatch, useSelector } from '@/redux/store';
import BotsList from '@/sections/bot/BotsList';
import BuildBot from '@/sections/bot/BuildBot';
import { useEffect } from 'react';
import { getBots } from '@/redux/slices/bots';
import HomeHero from '@/sections/home/HomeHero';

// ----------------------------------------------------------------------
const customReviver = (key, value) => {
  if (typeof value === 'object' && value !== null) {
    if ('$oid' in value) {
      return { $oid: value.$oid };
    }
    if ('$date' in value) {
      return new Date(value.$date);
    }
  }
  return value;
};

export default function HomePage() {
  console.log('home page');
  const dispatch = useDispatch();
  const { bots, isLoading } = useSelector((state) => state.bots);
  useEffect(() => {
    console.log('enter', bots.length, isLoading);
    if (bots.length === 0 && isLoading === false) {
      dispatch(getBots());
    }
  }, []);

  useEffect(() => {
    console.log('enter', isLoading);
  }, [isLoading]);

  return (
    <>
      <Helmet>
        <title>ACECO</title>
      </Helmet>

      <HomeHero />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <Container>
          <Box paddingTop={20} paddingBottom={20}>
            <BuildBot />
            <BotsList bots={bots} loading={bots.length === 0} />
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
