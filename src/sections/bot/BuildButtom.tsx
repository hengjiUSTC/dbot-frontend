// components
import Iconify from '@/components/iconify';
import { Typography } from '@mui/material';
import './BuildButtom.scss';
// ----------------------------------------------------------------------

export default function BuildButtom() {
  return (
    <div className="all container">
      <div className="all btn">
        <a href="/generate">
          <Iconify
            icon={'ion:hammer-outline'}
            width={{ xs: '25px' }}
            sx={{ marginRight: '10px' }}
          />
          <Typography sx={{ fontWeight: '400', opacity: '0.8', fontSize: '1.3rem' }}>
            创建应用
          </Typography>
        </a>
      </div>
    </div>
  );
}
