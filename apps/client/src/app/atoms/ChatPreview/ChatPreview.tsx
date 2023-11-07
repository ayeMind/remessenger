import { useChat } from '../../molecules/Chat/store';
import styles from './ChatPreview.module.scss';

export default function ChatPreview({
  id,
  name,
  email,
  password,
}: {
  id: number;
  name: string;
  email: string;
  password: string;
}) {
  const selectUser = useChat((state) => state.chooseUser);

  const openChatClick = () => {
    selectUser({ id: id, name: name, email: email, password: password });
  };

  return (
    <div onClick={openChatClick} className={styles['chat-preview']}>
      <div className={styles['avatar-template']} />
      <p> {name}</p>
    </div>
  );
}
