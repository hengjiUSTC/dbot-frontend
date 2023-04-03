import { useState, useEffect } from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Drawer, IconButton, IconButtonProps } from '@mui/material';
// hooks
import useResponsive from '@/hooks/useResponsive';
// components
import Iconify from '@/components/iconify';
//
import ChatRoomSingle from './ChatBotSingle';
import { IBot } from '@/types/bot';

// ----------------------------------------------------------------------

const StyledToggleButton = styled((props) => (
  <IconButton disableRipple {...props} />
))<IconButtonProps>(({ theme }) => ({
  right: 0,
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  top: theme.spacing(1),
  boxShadow: theme.customShadows.z8,
  border: `solid 1px ${theme.palette.divider}`,
  borderRight: 0,
  borderRadius: `12px 0 0 12px`,
  transition: theme.transitions.create('all'),
  '&:hover': {
    backgroundColor: theme.palette.background.neutral,
  },
}));

// ----------------------------------------------------------------------

const NAV_WIDTH = 240;

type Props = {
  bot: IBot;
  applyDefault: VoidFunction;
};

export default function ChatBotInfo({ bot, applyDefault}: Props) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'lg');

  const [openNav, setOpenNav] = useState(true);
  const [openInfo, setOpenInfo] = useState(true);

  const onOpenNav = () => {
    setOpenNav(true);
  };

  const onCloseNav = () => {
    setOpenNav(false);
  };

  useEffect(() => {
    if (!isDesktop) {
      onCloseNav();
    } else {
      onOpenNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop]);

  const renderContent = (
    <>
      <ChatRoomSingle
        bot={bot}
        isCollapse={openInfo}
        onCollapse={() => setOpenInfo(!openInfo)}
        applyDefault={applyDefault}
      />
    </>
  );

  return (
    <Box sx={{ position: 'relative' }}>
      <StyledToggleButton
        onClick={() => setOpenNav(!openNav)}
        sx={{
          ...(openNav &&
            isDesktop && {
              right: NAV_WIDTH,
            }),
        }}
      >
        <Iconify
          width={16}
          icon={openNav ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-back-fill'}
        />
      </StyledToggleButton>

      {isDesktop ? (
        <Drawer
          open={openNav}
          anchor="right"
          variant="persistent"
          PaperProps={{
            sx: {
              width: 1,
              position: 'static',
            },
          }}
          sx={{
            height: 1,
            width: NAV_WIDTH,
            transition: theme.transitions.create('width'),
            ...(!openNav && {
              width: 0,
            }),
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          anchor="right"
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
