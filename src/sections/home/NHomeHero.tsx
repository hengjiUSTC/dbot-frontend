import { styled } from '@mui/material/styles';
import { Box, Typography, useTheme } from '@mui/material';
import './NHomeHero.scss';
import Iconify from '@/components/iconify';

const StyledRoot = styled('div')(({ theme }) => ({
  width: '20rem',
  height: '20rem',
  borderRadius: '50%',
  margin: '0 auto',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    width: '40rem',
    height: '40rem',
    borderRadius: '50%',
    margin: '0 auto',
    position: 'relative',
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

export const NHomeHero = ({ name }: { name: any }) => {
  const theme = useTheme();
  return (
    <div className="n-home-hero">
      <StyledRoot className="ellipses-container">
        <StyledDescription>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: '1.2rem', md: '2.2rem' },
              fontWeight: '400',
              opacity: '0.5',
              textAlign: 'center',
            }}
          >
            定制大模型 <br /> 海量AGI应用平台
          </Typography>
          {name}
          <Box>
            <Iconify
              width={{ xs: '30px', md: '66px' }}
              sx={{ color: 'rgba(255, 255, 255, 0.319)' }}
              icon="material-symbols:keyboard-double-arrow-down-rounded"
            />
          </Box>
        </StyledDescription>
        <div className="ellipses ellipses__outer--thin">
          <div className="ellipses ellipses__orbit"></div>
        </div>

        <div className="ellipses ellipses__outer--thick"></div>
      </StyledRoot>
    </div>
  );
};
