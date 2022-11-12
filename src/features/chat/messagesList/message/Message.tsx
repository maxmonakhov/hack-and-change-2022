import { memo, ReactNode } from 'react';
import { ChatMessage } from '../../hooks/useGetMessages';
import { PaperClip } from '../../../../components/icons';

type MessageProps = {
  message: ChatMessage;
};

const Message = (props: MessageProps) => {
  const { message } = props;
  const { messageType, text, recipient, sender, mediaUrl } = message;

  let messageContent: ReactNode | null;

  switch (messageType) {
    case 'TEXT': {
      messageContent = <p className="text-base">{text}</p>;
      break;
    }

    case 'MEDIA': {
      messageContent = (
        <>
          <p className="text-base">{text}</p>
          {mediaUrl && (
            <div className='mt-2'>
              <PaperClip />
              <a className="text-blue-400 line-clamp-2" href={mediaUrl}>
                {mediaUrl}
              </a>
            </div>
          )}
        </>
      );
    }
  }
  if (messageType === 'TEXT') {
  }
  return (
    <div className="max-w-[min(250px,45%)] break-words rounded-xl bg-slate-100 p-4 ">
      {messageContent}
    </div>
  );
};

export default memo(Message);
