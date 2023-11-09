import { useEffect, useState } from 'react';
import styles from './WithoutLogin.module.scss';
import { useLogin } from '../../stores/login';
import getUserList from '../../api/getUserList';
import { User } from '../../interfaces';

export default function WithoutLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, setUser } = useLogin();
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    getUserList().then((res) => {
      setUserList(res);
    });
  }, []);

  function logInClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setEmail('');
      setPassword('');
      return;
    }

    const user = userList.find((user) => user.email === email);
    if (user && user.password === password) {
      setUser(user);
      login();
    } else {
      alert("User doesn't found!");
    }
  }

  return (
    <div className={styles['page']}>
      <div className={styles['popup']}>
        <h2 className={styles['title']}>Вход</h2>
        <form className={styles['login-form']} autoComplete="off">
          <input
            type="email"
            autoComplete="new-email"
            placeholder="Input email"
            className={styles['login-input']}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Input password"
            className={styles['login-input']}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className={styles['login-button']}
            onClick={logInClick}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
