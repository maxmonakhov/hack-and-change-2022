import { memo, ReactElement } from 'react';
import {
  ChatMessage,
  SignableWidget as SignableWidgetType,
  InvestIdeaWidget as InvestIdeaWidgetType,
  Widget
} from '../../hooks/useGetMessages';
import { BasicMessage } from './basicMessage';
import { SignableWidget } from './widgets/signableWidget';
import { InvestIdeaWidget } from './widgets/investIdea';

type MessageProps = {
  message: ChatMessage;
  isCurrentUserMessage: boolean;
};

const Message = (props: MessageProps) => {
  const { message, isCurrentUserMessage } = props;
  const { messageType, text, data, mediaUrl } = message;

  let messageElement: ReactElement | null = null;

  switch (messageType) {
    case 'WIDGET': {
      console.assert(
        !!data,
        'Нарушение типов. Поле data равно нулю у сообщения с типом "widget"'
      );
      const widgetData = data as Widget['data'];

      switch (widgetData.widgetType) {
        case 'SIGNABLE': {
          messageElement = (
            <SignableWidget
              isCurrentUserMessage={isCurrentUserMessage}
              widgetData={message as SignableWidgetType}
            />
          );
          break;
        }
        case 'INVEST_IDEA': {
          messageElement = (
            <InvestIdeaWidget
              isCurrentUserMessage={isCurrentUserMessage}
              widgetData={message as InvestIdeaWidgetType}
            />
          );
          break;
        }
        default: {
          messageElement = <BasicMessage text={text} mediaUrl={mediaUrl} />;
        }
      }

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
