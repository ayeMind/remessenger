import ChatPreview from '../../atoms/ChatPreview/ChatPreview';
import { ChatListItem } from '../../interfaces';

export default function ChatPreviewList({
  chatList,
}: {
  chatList: ChatListItem[];
}) {
  const chatListItems = chatList.map((item) => (
    <ChatPreview key={item.id} id={item.id} name={item.name} />
  ));

  return <ul>{chatListItems}</ul>;
}
