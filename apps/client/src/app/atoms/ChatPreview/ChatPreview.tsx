import { useChat } from '../../molecules/Chat/store';
import styles from './ChatPreview.module.scss';

export default function ChatPreview({
  id,
  name,
  email,
}: {
  id: number;
  name: string;
  email: string;
}) {
  const selectUser = useChat((state) => state.chooseUser);

  const openChatClick = () => {
    console.log(id);
    selectUser({ id: id, name: name, email: email });
  };

  return (
    <div onClick={openChatClick} className={styles['chat-preview']}>
      <div className={styles['avatar-template']} />
      <p> {name}</p>
    </div>
  );
}
