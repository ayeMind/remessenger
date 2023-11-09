import Chat from '../../molecules/Chat/Chat';
import SelectChatPanel from '../../organisms/SelectChatPanel/SelectChatPanel';
import styles from './WithLogin.module.scss';

export default function WithLogin() {
  return (
    <div className={styles['page']}>
      <SelectChatPanel />
      <Chat />
    </div>
  );
}
