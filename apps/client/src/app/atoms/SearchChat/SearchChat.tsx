import styles from './/SearchChat.module.scss'

export default function SearchChat() {
    return (
        <div className={styles["sticky-container"]}>
          <div className={styles["search-container"]}>
              <input type="search" placeholder="search" className={styles["search-input"]} />
          </div>
        </div>
      )
  }
  