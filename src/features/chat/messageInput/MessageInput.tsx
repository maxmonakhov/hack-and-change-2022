import { ChangeEvent, memo, useCallback, useState } from 'react';
import { Document, PaperAirplane, XMark } from '../../../components/icons';
import { FileUploader } from './fileUploader';
import { SendMessageRequest, useSendMessage } from '../hooks/useSendMessage';
import { ChatMessageType } from '../hooks/useGetMessages';
import { config } from '../../../config';

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

  const { mutate } = useSendMessage({
    optimisticUpdateData: config.optimisticUpdateEnabled
      ? { sender, recipient }
      : undefined
  });

  const clearInputs = useCallback(() => {
    setMessage('');
    setFileUrl('');
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

    const messageType: ChatMessageType = fileUrl ? 'MEDIA' : 'TEXT';

    const request: SendMessageRequest = {
      dialogId,
      text: message,
      messageType
    };

    if (fileUrl) request.mediaUrl = fileUrl;
    // if (data) request.data = data;

    mutate(request, { onSuccess: clearInputs });
  }, [message, dialogId, fileUrl]);

  const handleDocumentRemove = useCallback(() => {
    setFileUrl('');
  }, []);

  return (
    <>
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
        <FileUploader onUpload={setFileUrl} />
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

      {errorMessage && <p className="mx-9 mt-1 text-red-500">{errorMessage}</p>}
    </>
  );
};

export default memo(MessageInput);
