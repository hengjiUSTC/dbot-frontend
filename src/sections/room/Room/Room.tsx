import { useState } from 'react';
import axios from 'axios';
import PromptInput from '../PromptInput/PromptInput';
import './Room.scss';
import { ResponseInterface } from '../PromptResponseList/response-interface';
import PromptResponseList from '../PromptResponseList/PromptResponseList';
import { AppBar, Container, Toolbar } from '@mui/material';
import ScrollToBottom from 'react-scroll-to-bottom';
import { IBot } from '@/types/bot';

const Room = ({ bot }: { bot: IBot }) => {
  const [responseList, setResponseList] = useState<ResponseInterface[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [promptToRetry, setPromptToRetry] = useState<string | null>(null);
  const [uniqueIdToRetry, setUniqueIdToRetry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  let loadInterval: number | undefined;

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

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const addLoader = (uid: string) => {
    const element = document.getElementById(uid) as HTMLElement;
    element.textContent = '';

    // @ts-ignore
    loadInterval = setInterval(() => {
      // Update the text content of the loading indicator
      element.textContent += '.';

      // If the loading indicator has reached three dots, reset it
      if (element.textContent === '....') {
        element.textContent = '';
      }
    }, 300);
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

  const updateResponse = (uid: string, updatedObject: Record<string, unknown>) => {
    setResponseList((prevResponses) => {
      const updatedList = [...prevResponses];
      const index = prevResponses.findIndex((response) => response.id === uid);
      if (index > -1) {
        updatedList[index] = {
          ...updatedList[index],
          ...updatedObject,
        };
      }
      return updatedList;
    });
  };

  const regenerateResponse = async () => {
    await getGPTResult(promptToRetry, uniqueIdToRetry);
  };

  const getGPTResult = async (_promptToRetry?: string | null, _uniqueIdToRetry?: string | null) => {
    // Get the prompt input
    const _prompt = _promptToRetry ?? htmlToText(prompt);

    // If a response is already being generated or the prompt is empty, return
    if (isLoading || !_prompt) {
      return;
    }

    setIsLoading(true);

    // Clear the prompt input
    setPrompt('');

    let uniqueId: string;
    if (_uniqueIdToRetry) {
      uniqueId = _uniqueIdToRetry;
    } else {
      // Add the self prompt to the response list
      addResponse(true, _prompt);
      uniqueId = addResponse(false);
      await delay(50);
      addLoader(uniqueId);
    }

    try {
      // Send a POST request to the API with the prompt in the request body
      const response = await axios.post('get-prompt-result', {
        prompt: _prompt,
      });
      updateResponse(uniqueId, {
        response: response.data.trim(),
      });

      setPromptToRetry(null);
      setUniqueIdToRetry(null);
    } catch (err) {
      setPromptToRetry(_prompt);
      setUniqueIdToRetry(uniqueId);
      updateResponse(uniqueId, {
        // @ts-ignore
        response: `Error: ${err.message}`,
        error: true,
      });
    } finally {
      // Clear the loader interval
      clearInterval(loadInterval);
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <ScrollToBottom className="response-list">
        <PromptResponseList bot={bot} responseList={responseList} key="response-list" />
      </ScrollToBottom>
      <div id="input-container">
        {uniqueIdToRetry && (
          <div id="regenerate-button-container">
            <button
              id="regenerate-response-button"
              className={isLoading ? 'loading' : ''}
              onClick={() => regenerateResponse()}
            >
              Regenerate Response
            </button>
          </div>
        )}
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
    </div>
  );
};

export default Room;
