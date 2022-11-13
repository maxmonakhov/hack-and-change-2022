import { ChangeEvent, memo, useCallback, useState } from 'react';
import { Document, PaperAirplane, XMark } from '../../../components/icons';
import { FileUploader } from './fileUploader';
import { SendMessageRequest, useSendMessage } from '../hooks/useSendMessage';
import {
  ChatMessageType,
  InvestIdeaWidget,
  SignableWidget,
  WidgetType
} from '../hooks/useGetMessages';
import { config } from '../../../config';
import { WidgetsMenu } from '../messagesList/message/widgets/widgetsMenu';
import { SignableWidgetForm } from './widgetForms/signable';
import clsx from 'clsx';

type MessageInputProps = {
  dialogId: number;
  sender: number;
  recipient: number;
};

const MessageInput = (props: MessageInputProps) => {
  const { dialogId, sender, recipient } = props;

  const [message, setMessage] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string>();

  const [widgetType, setWidgetType] = useState<WidgetType | undefined>(
    undefined
  );

  const [willDocumentBeSigned, setWillDocumentBeSigned] =
    useState<boolean>(false);

  console.log('--- willDocumentBeSigned', willDocumentBeSigned);

  const [investIdeaWidgetData, setInvestIdeaWidgetData] = useState<
    InvestIdeaWidget['data']['widgetData'] | undefined
  >(undefined);

  const [isCloseWidgetBtnTooltipShown, setIsCloseWidgetBtnTooltipShown] =
    useState(false);

  const showCloseWidgetBtnTooltip = useCallback(() => {
    setIsCloseWidgetBtnTooltipShown(true);
  }, []);

  const hideCloseWidgetBtnTooltip = useCallback(() => {
    setIsCloseWidgetBtnTooltipShown(false);
  }, []);

  const { mutate } = useSendMessage({
    optimisticUpdateData: config.optimisticUpdateEnabled
      ? { sender, recipient }
      : undefined
  });

  const clearWidgetsData = useCallback(() => {
    setWidgetType(undefined);
    setWillDocumentBeSigned(false);
    setInvestIdeaWidgetData(undefined);
  }, []);

  const clearInputs = useCallback(() => {
    setMessage('');
    setFileUrl('');
    clearWidgetsData();
  }, []);

  const handleMessageChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value);
      setErrorMessage('');
    },
    []
  );

  const handleMessageSend = useCallback(() => {
    if (!message.length) {
      setErrorMessage('Нельзя отправить пустое сообщение');
      return;
    }

    let messageType: ChatMessageType | undefined;

    console.log('--- willDocumentBeSigned', willDocumentBeSigned);

    if (willDocumentBeSigned || investIdeaWidgetData) {
      messageType = 'WIDGET';
    } else if (!!fileUrl) {
      messageType = 'MEDIA';
    } else {
      messageType = 'TEXT';
    }

    const request: SendMessageRequest = {
      dialogId,
      text: message,
      messageType
    };

    if (investIdeaWidgetData) {
      const data: InvestIdeaWidget['data'] = {
        widgetType: 'INVEST_IDEA',
        widgetData: investIdeaWidgetData
      };
      request.data = data;
    } else if (willDocumentBeSigned) {
      console.log('--- setting data fro Signed document before sending');
      const data: SignableWidget['data'] = {
        widgetType: 'SIGNABLE',
        widgetData: {
          isSigned: false
        }
      };
      request.data = data;
    }

    if (fileUrl) request.mediaUrl = fileUrl;

    mutate(request, { onSuccess: clearInputs });
  }, [
    message,
    dialogId,
    fileUrl,
    fileUrl,
    willDocumentBeSigned,
    investIdeaWidgetData
  ]);

  const handleDocumentRemove = useCallback(() => {
    setFileUrl('');
  }, []);

  return (
    <div className="relative bg-slate-100">
      {widgetType && (
        <>
          <div className="absolute w-full -translate-y-full bg-slate-200 p-5">
            <div className="flex justify-between">
              <p className="text-xl text-slate-500">Заполните виджет</p>{' '}
              <div
                className={clsx('tooltip tooltip-bottom', {
                  'tooltip-open': isCloseWidgetBtnTooltipShown
                })}
                data-tip="Закрыть виджет и очистить данные"
              >
                <button
                  onClick={clearWidgetsData}
                  onMouseEnter={showCloseWidgetBtnTooltip}
                  onMouseLeave={hideCloseWidgetBtnTooltip}
                >
                  <XMark />
                </button>
              </div>
            </div>
            <div className="mt-4">
              {widgetType === 'SIGNABLE' ? (
                <SignableWidgetForm onChange={setWillDocumentBeSigned} />
              ) : null}
            </div>
          </div>
        </>
      )}
      <div className="m-3">
        {fileUrl && (
          <div className="mx-9 mb-3 flex justify-between gap-4">
            <Document className="w-6 min-w-[24px]" />
            <a className="truncate text-blue-400" href={fileUrl}>
              {fileUrl}
            </a>
            <button onClick={handleDocumentRemove}>
              <XMark className="w-6 min-w-[24px]" />
            </button>
          </div>
        )}
        <div className="flex">
          <div className="flex flex-col items-center justify-between">
            <WidgetsMenu onWidgetSelect={setWidgetType} />
            <FileUploader onUpload={setFileUrl} />
          </div>

          <textarea
            className="textarea mx-3 flex-1 resize-none"
            placeholder="Сообщение"
            value={message}
            onChange={handleMessageChange}
          />
          <button>
            <PaperAirplane onClick={handleMessageSend} />
          </button>
        </div>

        {errorMessage && (
          <p className="mx-9 mt-1 text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default memo(MessageInput);
