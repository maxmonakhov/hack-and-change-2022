import { LegacyRef, memo, useEffect, useRef } from 'react';
import { useGetMessages } from './hooks/useGetMessages';
import { MessagesList } from './messagesList';
import { Spinner } from '../../components/spinner';
import { MessageInput } from './messageInput';
import { config } from '../../config';

type ChatProps = {
  currentUserId: number;
  dialogId: number;
};

const Chat = (props: ChatProps) => {
  const { currentUserId, dialogId } = props;

  const {
    data: messages,
    isLoading: areMessagesLoading,
    isError: isGetingMessagesError
  } = useGetMessages(
    { dialogId: dialogId || 0 },
    {
      enabled: !!dialogId,
      refetchInterval: () =>
        config.refetchQueries.enabled && config.refetchQueries.refetchInterval
    }
  );

  // recipientId нам должен приходить вместе с dialogId.
  // Однако нет способа получить recipientId не из сообщения.
  // Поэтому это хак, чтобы получить recipientId.
  // Сломается, если история сообщений будет пуста
  const recipient = messages?.[0]?.recipient;

  const scrollableListRef: LegacyRef<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const scrollableList = scrollableListRef.current;

    if (scrollableList) {
      scrollableList.scrollTop = scrollableList.scrollHeight;
    }
  }, [messages, scrollableListRef]);

  if (isGetingMessagesError)
    return <p className="text-xl text-accent">Can't get messages. </p>;

  return (
    <div className="flex h-[600px] w-[600px] flex-col rounded-xl shadow-xl">
      <div
        ref={scrollableListRef}
        className="mt-6 flex-1 overflow-y-scroll px-6 pb-6"
      >
        {areMessagesLoading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <MessagesList
            currentUserId={currentUserId}
            messages={messages || []}
          />
        )}
      </div>
      <div className="bg-slate-100">
        <div className="p-3">
          <MessageInput
            sender={currentUserId}
            recipient={recipient || 0}
            dialogId={dialogId}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Chat);
