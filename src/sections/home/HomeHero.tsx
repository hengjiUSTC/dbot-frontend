import { m } from 'framer-motion';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Container, Grid } from '@mui/material';
// routes
// utils
import { textGradient, bgGradient } from '../../utils/cssStyles';
// config
import { baseUrl } from '@/main';
import path from 'node:path';
import { NHomeHero } from './NHomeHero';
import useResponsive from '@/hooks/useResponsive';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  ...bgGradient({
    color: alpha(theme.palette.background.default, 0.88),
    imgUrl: path.join(baseUrl, 'assets/overlay_2.jpg'),
  }),
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    position: 'fixed',
  },
}));

const StyledDescription = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(15, 0),
  height: '100%',
}));

const StyledGradientText = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`
  ),
  backgroundSize: '400%',
  fontFamily: "'Barlow', sans-serif",
  fontSize: `${3}rem`,
  textAlign: 'center',
  lineHeight: 1.2,
  padding: 0,
  marginTop: 8,
  marginBottom: 24,
  letterSpacing: 8,
  [theme.breakpoints.up('md')]: {
    fontSize: `${6}rem`,
  },
}));

const StyledEllipseTop = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: 480,
  top: -80,
  borderRadius: '50%',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.primary.darker, 0.12),
}));

const StyledEllipseBottom = styled('div')(({ theme }) => ({
  position: 'absolute',
  height: 400,
  bottom: -200,
  left: '10%',
  right: '10%',
  borderRadius: '50%',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.primary.darker, 0.08),
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  return (
    <>
      <StyledRoot>
        <Container sx={{ height: 1 }}>
          <Description />
        </Container>

        <StyledEllipseTop />

        <StyledEllipseBottom />
      </StyledRoot>

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}

// ----------------------------------------------------------------------

function Description() {
  const upMd = useResponsive('up', 'md');
  const title = (
    <StyledGradientText
      animate={{ backgroundPosition: '200% center' }}
      transition={{
        repeatType: 'reverse',
        ease: 'linear',
        duration: 20,
        repeat: Infinity,
      }}
    >
      ACE-GPT
    </StyledGradientText>
  );
  return (
    <StyledDescription>
      <NHomeHero name={title}></NHomeHero>
      <div
        style={{
          display: 'inline-block',
          transform: 'scaleX(-1)',
          position: 'absolute',
          top: upMd ? '30vh' : '35vh',
          left: upMd ? '33vh' : '2vh',
        }}
      >
        <div
          style={{
            transformOrigin: 'center center',
            width: '33vh',
            height: '16vh',
            zIndex: '-1',
            filter: 'blur(56px)',
            opacity: '.69',
            borderRadius: '20px',
            transform: 'skewY(8deg) translateY(-10%)',
            backgroundImage:
              'linear-gradient(rgb(82, 57, 208), rgb(123, 50, 194), rgb(125, 10, 201), rgb(166, 110, 188), rgb(123, 83, 178), rgb(0, 162, 234), rgb(0, 181, 236), rgb(20 152 226), rgb(16 70 217))',
          }}
        />
      </div>
      <div
        style={{
          display: 'inline-block',
          transform: 'scaleX(-1)',
          position: 'absolute',
          top: upMd ? '60vh' : '15vh',
          right: '25vh',
        }}
      >
        <div
          style={{
            transformOrigin: 'center center',
            width: '33vh',
            height: '16vh',
            zIndex: '-1',
            filter: 'blur(56px)',
            opacity: '.69',
            borderRadius: '20px',
            transform: 'skewY(-15deg) translateY(-10%)',
            backgroundImage:
              'linear-gradient(to right top, rgb(108, 34, 189), rgb(139, 37, 187), rgb(165, 43, 185), rgb(188, 52, 183), rgb(208, 64, 181), rgb(84 77 188), rgb(28 41 180), rgb(24 94 229))',
          }}
        />
      </div>
    </StyledDescription>
  );
}
