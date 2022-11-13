import { memo, ReactElement } from 'react';
import { ChatMessage } from '../../hooks/useGetMessages';
import { BasicMessage } from './basicMessage';

type MessageProps = {
  message: ChatMessage;
};

const Message = (props: MessageProps) => {
  const { message } = props;
  const { messageType, text, recipient, sender, mediaUrl } = message;

  let messageElement: ReactElement | null = null;

  switch (messageType) {
    case 'WIDGET': {
      /*   if () {

      }*/

      break;
    }
    case 'TEXT':
    case 'MEDIA': {
      messageElement = <BasicMessage text={text} mediaUrl={mediaUrl} />;
    }
  }
  if (messageType === 'TEXT') {
  }
  return messageElement;
};

export default memo(Message);
