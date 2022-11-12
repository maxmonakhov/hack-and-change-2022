import {memo} from 'react';
import {PaperAirplane, PaperClip} from "../../../components/icons";

type MessageInputProps = {}

const MessageInput = (props: MessageInputProps) => {
  return (
    <div className='flex gap-3'>
      <button><PaperClip /></button>
      <textarea className="textarea flex-1 resize-none"  placeholder="Сообщение"></textarea>
      <button><PaperAirplane /></button>
    </div>
  )
}

export default memo(MessageInput)
