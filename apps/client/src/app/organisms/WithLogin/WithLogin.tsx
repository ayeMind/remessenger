import { ChatListItem } from '../../interfaces';
import Chat from '../../molecules/Chat/Chat';
import SelectChatPanel from '../../molecules/SelectChatPanel/SelectChatPanel';
import SearchChat from '../../atoms/SearchChat/SearchChat';
import styles from './WithLogin.module.scss'

const chatList: ChatListItem[] = [
  { id: 1, name: 'Roy Buchanan' },
  { id: 2, name: 'Nathan Carroll' },
  { id: 3, name: 'Janie Gregory' },
  { id: 4, name: 'Roy McCoy' },
  { id: 5, name: 'Jordan Williams' },
  { id: 6, name: 'Lucile Carter' },
  { id: 7, name: 'Hilda Wong' },
  { id: 8, name: 'Bettie Marshall' },
  { id: 9, name: 'Bertha Blair' },
  { id: 10, name: 'Lottie Garrett' },
  { id: 11, name: 'Donald Cunningham' },
  { id: 12, name: 'Christopher Ortega' },
  { id: 13, name: 'Ola Barker' },
  { id: 14, name: 'Albert Chandler' },
  { id: 15, name: 'Marc Watts' },
  { id: 16, name: 'Jeremiah Hill' },
];

export default function WithLogin() {
  return (
    <div className={styles["page"]}>
      <div className={styles["panel-container"]}>
        <SearchChat />
        <SelectChatPanel chatList={chatList} />
      </div>
      <main className={styles["chat-container"]}>
        <Chat />
      </main>
    </div>
  );
}
