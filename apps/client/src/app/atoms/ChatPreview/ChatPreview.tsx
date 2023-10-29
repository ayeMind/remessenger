import { useChat } from "../../molecules/Chat/store";
import styles from "./ChatPreview.module.scss"

export default function ChatPreview({ id, name }: { id: number, name: string }) {

    const selectUser = useChat(state => state.chooseUser)

    const openChatClick = () => {
        console.log(id);
        selectUser({user_id: id, user_name: name})
    }

    return (
        <div onClick={openChatClick} className={styles["chat-preview"]}>
            <div className={styles["avatar-template"]} />
            <p> {name}</p>
        </div>
    );
}