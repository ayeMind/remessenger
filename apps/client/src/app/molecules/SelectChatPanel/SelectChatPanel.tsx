import { ChatListItem } from "../../interfaces";
import ChatPreview from "../../atoms/ChatPreview/ChatPreview";

export default function SelectChatPanel({ chatList }: { chatList: ChatListItem[] }) {

    const chatListItems = chatList.map((item) => (
        <ChatPreview key={item.id} id={item.id} name={item.name} />
    ));

    return (
        <ul>{chatListItems}</ul>
    );
}
