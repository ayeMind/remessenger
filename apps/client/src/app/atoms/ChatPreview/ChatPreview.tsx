import { useChat } from '../../molecules/Chat/store';
import { useLogin } from '../../pages/store';
import styles from './ChatPreview.module.scss';

export default function ChatPreview({
  id,
  name,
  email,
  password,
  avatar,
}: {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
}) {
  const selectUser = useChat((state) => state.chooseUser);

  const { user } = useLogin();
  const displayedName = user?.id === id ? 'Saved Messages' : name;

  const openChatClick = () => {
    selectUser({
      id: id,
      name: name,
      email: email,
      password: password,
      avatar: avatar,
    });
  };

  const avatarStyle =
    user?.id !== id
      ? {
          backgroundImage: `url(${avatar})`,
        }
      : {
          backgroundImage: 'url(savedmessages.jpg)',
        };

  return (
    <div onClick={openChatClick} className={styles['chat-preview']}>
      <div className={styles['avatar-template']} style={avatarStyle} />
      <p> {displayedName}</p>
    </div>
  );
}
