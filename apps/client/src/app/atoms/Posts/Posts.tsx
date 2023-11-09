import { Message } from '../../interfaces';
import { useChat } from '../../stores/chat';
import { useLogin } from '../../stores/login';
import styles from './Posts.module.scss';

export default function Posts({ postList }: { postList: Message[] }) {
  const { user } = useLogin();
  const { selectedUser } = useChat();

  const postListItems = postList.map((item, index) => {
    if (item.chatId !== selectedUser.id && item.userId !== selectedUser.id)
      return null;
    if (item.chatId === item.userId && item.userId !== user?.id) return null; // saved messages (not mine)
    if (item.chatId !== item.userId && user?.id === selectedUser.id)
      return null; // saved messages (mine)

    const isAuthorClass = user?.id === item.userId ? 'author' : '';
    const date = new Date(item.createdAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const avatarStyle = {
      backgroundImage: `url(${
        item.userId === user?.id ? user.avatar : selectedUser.avatar
      })`,
    };

    return (
      <div className={styles.post} key={index}>
        <div className={styles.avatar} style={avatarStyle} />
        <div className={`${styles.message} ${styles[isAuthorClass]}`}>
          <p className={styles['message-text']}>{item.text}</p>
          <p className={styles.date}>{`${hours}:${minutes}`}</p>
        </div>
      </div>
    );
  });

  return <ul className={styles['posts-container']}>{postListItems}</ul>;
}
