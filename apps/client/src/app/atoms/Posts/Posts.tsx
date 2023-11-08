import { Message } from '../../interfaces';
import { useChat } from '../../molecules/Chat/store';
import { useLogin } from '../../pages/store';
import styles from './Posts.module.scss';

export default function Posts({ postList }: { postList: Message[] }) {
  const { user } = useLogin();
  const { selectedUser } = useChat();

  const postListItems = postList.map((item, index) => {
    if (item.chatId !== selectedUser.id) return null;
    if (item.chatId === user?.id && item.userId !== user?.id) return null; // Saved Messages

    const isAuthorClass = user?.id === item.userId ? 'author' : '';
    const date = new Date(item.createdAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return (
      <div className={styles.post} key={index}>
        <div className={styles.avatar} />
        <div className={`${styles.message} ${styles[isAuthorClass]}`}>
          <p className={styles['message-text']}>{item.text}</p>
          <p className={styles.date}>{`${hours}:${minutes}`}</p>
        </div>
      </div>
    );
  });

  return <ul className={styles['posts-container']}>{postListItems}</ul>;
}
