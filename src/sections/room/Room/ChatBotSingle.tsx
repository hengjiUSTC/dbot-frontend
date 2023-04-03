// @mui
import { Avatar, Divider, Typography, Stack, Collapse, Tooltip, IconButton } from '@mui/material';
//
import { IBot } from '@/types/bot';
import ChatRoomCollapseButton from './ChatRoomCollapseButton';
import Iconify from '@/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  bot: IBot;
  isCollapse: boolean;
  onCollapse: VoidFunction;
  applyDefault: VoidFunction;
};

export default function ChatBotSingle({ bot, isCollapse, onCollapse, applyDefault }: Props) {
  return (
    <div>
      <Stack alignItems="center" sx={{ padding: 4 }}>
        <Avatar alt={bot.name} src={bot.image} sx={{ width: 96, height: 96, mb: 2 }} />

        <Typography variant="subtitle1">{bot.name}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          {bot.description}
        </Typography>
      </Stack>

      <Divider />

      <ChatRoomCollapseButton isCollapse={isCollapse} onCollapse={onCollapse}>
        information
      </ChatRoomCollapseButton>

      <Collapse in={isCollapse}>
        <Stack
          spacing={2}
          sx={{
            p: (theme) => theme.spacing(2, 2.5, 2.5, 2.5),
          }}
        >
          <Stack direction="row">
            <Tooltip title="使用此示例">
              <IconButton onClick={applyDefault}>
                <Iconify icon="mdi:message-arrow-left-outline" />
              </IconButton>
            </Tooltip>
            <Typography variant="body2">{bot.default_prompt}</Typography>
          </Stack>
        </Stack>
      </Collapse>
    </div>
  );
}
