import { User } from '@prisma/client';
import Chat from '../../molecules/Chat/Chat';
import SelectChatPanel from '../../organisms/SelectChatPanel/SelectChatPanel';
import styles from './WithLogin.module.scss';

export default function WithLogin(user: User) {
  return (
    <div className={styles['page']}>
      <SelectChatPanel />
      <Chat />
    </div>
  );
}
