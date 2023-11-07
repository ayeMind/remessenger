import { Message } from '../../interfaces';
import styles from './Posts.module.scss';

export default function Posts({ postList }: { postList: Message[] }) {
  const postListItems = postList.map((item, index) => (
    <div className={styles['post']} key={index}>
      <div className={styles['avatar']} />
      <div className={styles['message']}>
        <p className={styles['message-text']}>{item.text}</p>
      </div>
    </div>
  ));

  return <ul className={styles['posts-container']}>{postListItems}</ul>;
}
