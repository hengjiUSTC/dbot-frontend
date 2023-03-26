import { FC, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { ResponseInterface } from './response-interface';
import hljs from 'highlight.js';
import './PromptResponseList.scss';
import { Avatar } from '@mui/material';
import { IBot } from '@/types/bot';

interface PromptResponseListProps {
  responseList: ResponseInterface[];
  bot: IBot;
}

const PromptResponseList: FC<PromptResponseListProps> = ({ responseList, bot }) => {
  const Bot_Image = bot.image;
  const MyImg = '/assets/avatar.jpeg';
  const responseListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hljs.highlightAll();
  });

  useEffect(() => {
    hljs.highlightAll();
  }, [responseList]);

  return (
    <div className="prompt-response-list" ref={responseListRef}>
      {responseList.map((responseData) => (
        <div
          className={
            'response-container ' + (responseData.selfFlag ? 'my-question' : 'chatgpt-response')
          }
          key={responseData.id}
        >
          {responseData.selfFlag ? (
            <Avatar src={MyImg} className="avatar-image" variant="square" />
          ) : (
            <img className="avatar-image" src={Bot_Image} alt="avatar" />
          )}
          <div
            className={(responseData.error ? 'error-response ' : '') + 'prompt-content'}
            id={responseData.id}
          >
            {responseData.response && (
              <ReactMarkdown
                components={{
                  code({ className, children }) {
                    return <code className={className}>{children}</code>;
                  },
                }}
              >
                {responseData.response ?? ''}
              </ReactMarkdown>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromptResponseList;
