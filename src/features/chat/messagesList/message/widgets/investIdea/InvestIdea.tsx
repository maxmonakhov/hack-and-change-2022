import { memo, useCallback } from 'react';
import { InvestIdeaWidget } from '../../../../hooks/useGetMessages';
import { BasicMessage } from '../../basicMessage';

type InvestIdeaProps = {
  widgetData: InvestIdeaWidget;
  isCurrentUserMessage: boolean;
};

const InvestIdea = (props: InvestIdeaProps) => {
  const { widgetData, isCurrentUserMessage } = props;
  const { text, mediaUrl, data: messageData } = widgetData;

  const handleWidgetSign = useCallback(() => {}, []);

  return (
    <BasicMessage text={text} mediaUrl={mediaUrl}>
      <input
        type="submit"
        value="Подписать"
        className="btn-info btn text-white"
        onClick={handleWidgetSign}
      />
    </BasicMessage>
  );
};

export default memo(InvestIdea);
