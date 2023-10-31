import styles from './Posts.module.scss'

export default function Posts({ postList }: { postList: string[] }) {
    const postListItems = postList.map((item, index) => (
      <div className={styles["post"]} key={index}>
        <div className={styles["avatar"]} />
        <div
          className={styles["message"]}
        >
          <p className={styles["message-text"]}>{item}</p>
        </div>
      </div>
    ));
  
    return (
      <ul className={styles["posts-container"]}>
        {postListItems}
      </ul>
    );
  }
  