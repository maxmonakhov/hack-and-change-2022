import { ChatMessage } from '../hooks/useGetMessages';
import { memo } from 'react';
import { Message } from './message';
import clsx from 'clsx';

type MessagesListProps = {
  messages: ChatMessage[];
  currentUserId: number;
};

const MessagesList = (props: MessagesListProps) => {
  const { messages: initialMessages, currentUserId } = props;

  console.log('--- message List rerenders');

  const messages = initialMessages.sort(
    (one, another) => one.timestamp - another.timestamp
  );

  return (
    <>
      {messages.length === 0 ? (
        <p>Нет сообщений</p>
      ) : (
        messages.map((message, index) => {
          const { messageId, sender } = message;
          const isCurrentUserMessage = sender === currentUserId;

          return (
            <div
              key={messageId}
              className={clsx('flex flex-1', {
                'mt-4': index !== 0,
                'justify-end': isCurrentUserMessage,
                'justify-start': !isCurrentUserMessage
              })}
            >
              <Message message={message} />
            </div>
          );
        })
      )}
    </>
  );
};

export default memo(MessagesList);
