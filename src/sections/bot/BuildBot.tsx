// @mui
import { Button } from '@mui/material';
// components
import Iconify from '@/components/iconify';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function BuildBot() {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    navigate('/generate');
  };

  return (
    <Button
      size="large"
      disableRipple
      color="inherit"
      onClick={handleClick}
      endIcon={<Iconify icon={'ion:hammer-outline'} />}
      sx={{ height: 50, fontSize: 20, fontWeight: 30 }}
    >
      DIY YOURS
    </Button>
  );
}
