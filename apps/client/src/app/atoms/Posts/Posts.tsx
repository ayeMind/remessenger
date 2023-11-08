import { Message } from '../../interfaces';
import styles from './Posts.module.scss';
import { useLogin } from '../../pages/store';

export default function Posts({ postList }: { postList: Message[] }) {
  const { user } = useLogin();

  const postListItems = postList.map((item, index) => {
    const isAuthorClass = user?.id === item.userId ? 'author' : '';
    console.log(isAuthorClass);

    return (
      <div className={styles.post} key={index}>
        <div className={styles.avatar} />
        <div className={`${styles.message} ${styles[isAuthorClass]}`}>
          <p className={styles['message-text']}>{item.text}</p>
        </div>
      </div>
    );
  });

  return <ul className={styles['posts-container']}>{postListItems}</ul>;
}
