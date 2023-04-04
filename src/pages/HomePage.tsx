import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Container } from '@mui/material';
import Footer from '@/layouts/main/Footer';
import { useDispatch, useSelector } from '@/redux/store';
import BotsList from '@/sections/bot/BotsList';
import { useEffect } from 'react';
import { getBots } from '@/redux/slices/bots';
import HomeHero from '@/sections/home/HomeHero';
import BuildButtom from '@/sections/bot/BuildButtom';

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
  const dispatch = useDispatch();
  const { bots, isLoading } = useSelector((state) => state.bots);
  useEffect(() => {
    if (bots.length === 0 && isLoading === false) {
      dispatch(getBots());
    }
  }, [bots.length, dispatch, isLoading]);

  return (
    <>
      <Helmet>
        <title>ACE-GPT</title>
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
          <Box paddingTop={8} paddingBottom={5}>
            <BuildButtom />
            <BotsList bots={bots} loading={bots.length === 0} />
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
