import ChatPreview from '../../atoms/ChatPreview/ChatPreview';
import { User } from '../../interfaces';

export default function ChatPreviewList({ chatList }: { chatList: User[] }) {
  const chatListItems = chatList.map((item) => (
    <ChatPreview
      key={item.id}
      id={item.id}
      name={item.name}
      email={item.email}
      password={item.password}
      avatar={item.avatar}
    />
  ));

  return <ul>{chatListItems}</ul>;
}
