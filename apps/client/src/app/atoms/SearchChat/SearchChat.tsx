import getUserList from '../../api/getUserList';
import { User } from '../../interfaces';
import styles from './/SearchChat.module.scss';
import { useSearchFilter } from './store';

export default function SearchChat() {
  const { search, setSearch, filter } = useSearchFilter();
  let userList: User[];

  getUserList().then((data) => {
    userList = data;
  });

  function onInput(e: React.FormEvent<HTMLInputElement>) {
    const inputValue = e.currentTarget.value;
    setSearch(inputValue);
    filter(userList, inputValue);
  }

  return (
    <div className={styles['sticky-container']}>
      <div className={styles['search-container']}>
        <input
          value={search}
          type="search"
          placeholder="search"
          className={styles['search-input']}
          onInput={onInput}
        />
      </div>
    </div>
  );
}
