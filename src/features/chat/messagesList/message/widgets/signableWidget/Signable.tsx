import { memo, useCallback } from 'react';
import { SignableWidget } from '../../../../hooks/useGetMessages';
import { BasicMessage } from '../../basicMessage';
import clsx from 'clsx';
import { useUpdateWidget } from '../useUpdateWidget';

type SignableWidgetProps = {
  widgetData: SignableWidget;
  isCurrentUserMessage: boolean;
};

const Signable = (props: SignableWidgetProps) => {
  const { widgetData, isCurrentUserMessage } = props;

  const { text, mediaUrl, data: messageData, messageId } = widgetData;
  const isSigned = messageData.widgetData.isSigned;

  const { mutate } = useUpdateWidget();

  const handleWidgetSign = useCallback(() => {
    mutate({
      messageId,
      data: {
        ...messageData,
        widgetData: { isSigned: true }
      }
    });
  }, []);

  return (
    <BasicMessage text={text} mediaUrl={mediaUrl}>
      <div className="mt-4">
        {!isCurrentUserMessage && !isSigned ? (
          <input
            type="submit"
            value="Подписать"
            className="btn-info btn text-white"
            onClick={handleWidgetSign}
          />
        ) : (
          <div
            className={clsx('badge text-white', {
              'badge-accent': isSigned,
              'badge-warning': !isSigned
            })}
          >
            {isSigned ? 'Подписано' : 'Не подписано'}
          </div>
        )}
      </div>
    </BasicMessage>
  );
};

export default memo(Signable);
