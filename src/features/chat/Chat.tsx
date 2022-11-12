import { memo } from 'react';
import { useGetMessages } from './hooks/useGetMessages';
import { MessagesList } from './messagesList';
import { Spinner } from '../../components/spinner';
import {MessageInput} from "./messageInput";

type ChatProps = {
  currentUserId: number;
  dialogId: number;
};

const Chat = (props: ChatProps) => {
  const { currentUserId, dialogId } = props;

  const {
    data: messagesData,
    isLoading: areMessagesLoading,
    isError: isGetingMessagesError
  } = useGetMessages({ dialogId: dialogId || 0 }, { enabled: !!dialogId });

  const { messages } = messagesData || {};

  console.log('--- dialogId', dialogId);

  if (isGetingMessagesError)
    return <p className="text-xl text-accent">Can't get messages. </p>;

  return (
    <div className="h-[400px] w-[600px] rounded-xl shadow-xl flex flex-col">
      <div className="overflow-y-scroll flex-1 p-6">
        {areMessagesLoading ? (
          <Spinner />
        ) : (
          <MessagesList currentUserId={currentUserId} messages={messages || []} />
        )}
      </div>
      <div className='mt-4 bg-slate-100'>
        <div className='p-3'>
          <MessageInput />
        </div>
      </div>

    </div>
  );
};

export default memo(Chat);
