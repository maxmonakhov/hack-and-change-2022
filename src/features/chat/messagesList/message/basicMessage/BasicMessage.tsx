import { memo, PropsWithChildren } from 'react';
import { PaperClip } from '../../../../../components/icons';
import { ChatMessage } from '../../../hooks/useGetMessages';

type BasicMessageProps = Pick<ChatMessage, 'text' | 'mediaUrl'>;

const BasicMessage = (props: PropsWithChildren<BasicMessageProps>) => {
  const { text, mediaUrl, children } = props;

  return (
    <div className="max-w-[min(250px,45%)] break-words rounded-xl bg-slate-100 p-4 ">
      <p className="text-base">{text}</p>
      {mediaUrl && (
        <div className="mt-2">
          <PaperClip />
          <a className="text-blue-400 line-clamp-2" href={mediaUrl}>
            {mediaUrl}
          </a>
        </div>
      )}
      {children}
    </div>
  );
};

export default memo(BasicMessage);
