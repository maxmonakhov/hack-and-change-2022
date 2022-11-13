import { ChatMessage } from '../features/chat/hooks/useGetMessages';
import messagesList from '../features/chat/messagesList/MessagesList';

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
    messageId: 'g599b24b-3ab9-4f99-aacc-faef8d5f22b3',
    text: 'Второе сообщение',
    data: null,
    messageType: 'TEXT',
    mediaUrl: null,
    sender: 100501,
    recipient: 100500,
    dialogId: 1,
    timestamp: 1668153777165
  },
  {
    messageId: '3a0da872-f8a8-4316-bb23-02a1161ea84d',
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
    messageId: '83b5eb8b-bb7f-41e0-8b06-2638c8c09e50',
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
    messageId: 'b8a0332a-a15c-4f8f-8085-afd867489912',
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
    messageId: 'cb0dad47-dec2-4d40-9744-5b5d51c4b936',
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
  },
  {
    messageId: '4a0da872-f8a8-4316-bb23-02a1161ea84d',
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
    messageId: '93b5eb8b-bb7f-41e0-8b06-2638c8c09e50',
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
    messageId: 'c8a0332a-a15c-4f8f-8085-afd867489912',
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
    messageId: 'db0dad47-dec2-4d40-9744-5b5d51c4b936',
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
    messageId: 'k599b24b-3ab9-4f99-aacc-faef8d5f22b3',
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

export const mock = {
  messagesList
};
