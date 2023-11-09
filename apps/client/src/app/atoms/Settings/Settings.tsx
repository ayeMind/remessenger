import { Menu, Search } from 'lucide-react';
import { useLogin } from '../../stores/login';
import { useChat } from '../../stores/chat';
import styles from './Settings.module.scss';

export default function Settings() {
  const { selectedUser } = useChat();
  const { user } = useLogin();

  const displayedName =
    user?.id === selectedUser.id ? 'Saved Messages' : selectedUser.name;

  return (
    <div className={styles['chat-info']}>
      <p className={styles['chat-name']}>{displayedName}</p>
      <div className={styles['settings']}>
        <Search />
        <Menu />
      </div>
    </div>
  );
}
