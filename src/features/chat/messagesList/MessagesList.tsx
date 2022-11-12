import { ChatMessage } from '../hooks/useGetMessages';
import { memo } from 'react';
import { Message } from './message';
import clsx from 'clsx';

type MessagesListProps = {
  messages: ChatMessage[];
  currentUserId: number;
};

const massagesListMock: ChatMessage[] = [
  {
    messageId: '2a0da872-f8a8-4316-bb23-02a1161ea84d',
    text: 'Привет, оператор!',
    data: null,
    messageType: 'TEXT',
    mediaUrl: null,
    sender: 100500,
    recipient: 100501,
    dialogId: 1,
    timestamp: 1668153997208
  },
  {
    messageId: '73b5eb8b-bb7f-41e0-8b06-2638c8c09e50',
    text: 'Привет, оператор!',
    data: null,
    messageType: 'TEXT',
    mediaUrl: null,
    sender: 100500,
    recipient: 100501,
    dialogId: 1,
    timestamp: 1668153956319
  },
  {
    messageId: 'a8a0332a-a15c-4f8f-8085-afd867489912',
    text: 'Третье сообщение',
    data: '{"item":"something"}',
    messageType: 'WIDGET',
    mediaUrl: null,
    sender: 100501,
    recipient: 100500,
    dialogId: 1,
    timestamp: 1668153893209
  },
  {
    messageId: 'bb0dad47-dec2-4d40-9744-5b5d51c4b936',
    text: 'Второе сообщение',
    data: null,
    messageType: 'MEDIA',
    mediaUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Kotlin_logo.svg/2560px-Kotlin_logo.svg.png',
    sender: 100501,
    recipient: 100500,
    dialogId: 1,
    timestamp: 1668153813276
  },
  {
    messageId: 'f599b24b-3ab9-4f99-aacc-faef8d5f22b3',
    text: 'Второе сообщение',
    data: null,
    messageType: 'TEXT',
    mediaUrl: null,
    sender: 100501,
    recipient: 100500,
    dialogId: 1,
    timestamp: 1668153777165
  }
];

const MessagesList = (props: MessagesListProps) => {
  const { /*messages, */ currentUserId } = props;

  const messages = [
    ...massagesListMock,
    ...massagesListMock,
    ...massagesListMock
  ];

  console.log('--- messages', messages);

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
                'justify-items-end': isCurrentUserMessage,
                'justify-items-start': !isCurrentUserMessage
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
