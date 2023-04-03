import { useState } from 'react';
import PromptInput from '../PromptInput/PromptInput';
import './Room.scss';
import { ResponseInterface } from '../PromptResponseList/response-interface';
import PromptResponseList from '../PromptResponseList/PromptResponseList';
import { Box, Divider, LinearProgress, Stack, Toolbar } from '@mui/material';
import ScrollToBottom from 'react-scroll-to-bottom';
import { IBot } from '@/types/bot';
import ChatBotInfo from './ChatBotInfo';
import { instance } from '@/network/axiosInstance';

interface GptMessages {
  role: string;
  content: string;
}

const Room = ({ bot }: { bot: IBot }) => {
  const [responseList, setResponseList] = useState<ResponseInterface[]>([]);
  const [gptMessageQueue, setGptMessageQueue] = useState<GptMessages[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [promptToRetry, setPromptToRetry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  let loadInterval: any | undefined;

  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
  };

  const htmlToText = (html: string) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent;
  };

  const addResponse = (selfFlag: boolean, response?: string) => {
    const uid = generateUniqueId();
    setResponseList((prevResponses) => [
      ...prevResponses,
      {
        id: uid,
        response,
        selfFlag,
      },
    ]);
    return uid;
  };

  const updateResponse = (updatedObject: ResponseInterface) => {
    setResponseList((prevResponses) => {
      console.log('prevResponses: ', prevResponses, updatedObject);
      const updatedList = [...prevResponses, updatedObject];
      console.log('update response', updatedList);
      return updatedList;
    });
  };

  const getGPTResult = async (_promptToRetry?: string | null) => {
    // Get the prompt input
    const _prompt = _promptToRetry ?? htmlToText(prompt);

    // If a response is already being generated or the prompt is empty, return
    if (isLoading || !_prompt) {
      return;
    }

    setIsLoading(true);

    // Clear the prompt input
    setPrompt('');

    const response_id = generateUniqueId();
    try {
      // Send a POST request to the API with the prompt in the request body
      const bodyFormData = new FormData();
      bodyFormData.set('prompt', bot.prompt);
      const messages = gptMessageQueue.map((r) => {
        return r;
      });
      messages.push({ role: 'user', content: _prompt });
      console.log(messages, JSON.stringify(messages));

      bodyFormData.set('messages', JSON.stringify(messages));

      // process queue
      addResponse(true, _prompt);
      setGptMessageQueue((oldQueue) => {
        const updatedQueue = [...oldQueue, { role: 'user', content: _prompt }];
        console.log('update setGptMessageQueue', updatedQueue);
        return updatedQueue;
      });

      const response = await instance.post('/bot/chat/', bodyFormData);
      console.log(response);
      const reply = response.data.data.trim();
      updateResponse({
        id: response_id,
        response: reply,
        selfFlag: false,
      });

      setGptMessageQueue((oldQueue) => {
        const updatedQueue = [...oldQueue, { role: 'assistant', content: reply }];
        console.log('update setGptMessageQueue', updatedQueue);
        return updatedQueue;
      });
      setPromptToRetry(null);
    } catch (err: any) {
      setPromptToRetry(_prompt);
      updateResponse({
        id: response_id,
        response: `Error: ${err.message}`,
        error: true,
        selfFlag: false,
      });
    } finally {
      // Clear the loader interval
      clearInterval(loadInterval);
      setIsLoading(false);
    }
  };

  const applyDefault = () => {
    setPrompt(bot.default_prompt);
  };

  return (
    <div className="App">
      <Stack
        direction="row"
        flexGrow={1}
        sx={{
          overflow: 'hidden',
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
          height: '100%',
          borderRadius: '10px',
          backgroundColor: (theme) => `${theme.palette.background.paper}`,
        }}
      >
        <Stack flexGrow={1} sx={{ minWidth: 0, padding: '15px' }}>
          <ScrollToBottom className="response-list">
            <PromptResponseList bot={bot} responseList={responseList} key="response-list" />
          </ScrollToBottom>
          {isLoading ? (
            <Box sx={{ marginBottom: 3, marginTop: 3, width: '100%' }}>
              <LinearProgress />
            </Box>
          ) : (
            <Divider sx={{ marginBottom: 3, marginTop: 3 }} />
          )}
          <div>
            <Toolbar
              sx={{
                borderRadius: '1rem',
                maxWidth: '1200px',
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundColor: 'rgba(64, 65, 79, 1)',
                borderColor: 'rgba(32, 33, 35, 0.5)',
              }}
            >
              <PromptInput
                prompt={prompt}
                onSubmit={() => getGPTResult()}
                key="prompt-input"
                updatePrompt={(prompt) => setPrompt(prompt)}
              />
              <button
                id="submit-button"
                className={isLoading ? 'loading' : ''}
                onClick={() => getGPTResult()}
              ></button>
            </Toolbar>
          </div>
        </Stack>

        {bot && <ChatBotInfo bot={bot} applyDefault={applyDefault} />}
      </Stack>
    </div>
  );
};

export default Room;
