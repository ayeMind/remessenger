import { useEffect, useState } from 'react';
import { useChat } from './store';
import Posts from '../../atoms/Posts/Posts';
import styles from './Chat.module.scss';
import { io } from 'socket.io-client';
import { MoreVertical, Search, SendHorizontal } from 'lucide-react';
import { useLogin } from '../../pages/store';
import { Message } from '../../interfaces';
import getMessages from '../../api/getMessages';

const socket = io('ws://localhost:3000/chat');

export default function Chat() {
  const [postList, setPostList] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const { selectedUser } = useChat();
  const { user } = useLogin();

  useEffect(() => {
    getMessages().then((res) => {
      setPostList(res);
      console.log(res);
    });

    function onRecMessage(message: Message) {
      setPostList((prev) => [...prev, message]);
    }

    socket.on('recMessage', onRecMessage);

    return () => {
      socket.off('recMessage', onRecMessage);
    };
  }, []);

  function messagePost(event: any) {
    event.preventDefault();
    if (!message.trim()) {
      setMessage('');
      return;
    }

    socket.emit('sendMessage', {
      text: message,
      userId: user?.id,
      chatId: selectedUser.id,
      createdAt: new Date(),
    });
    setMessage('');
  }

  const displayedName = user?.id === selectedUser.id ? 'Saved Messages' : selectedUser.name;

  return (
    <main className={styles['chat-container']}>
      {selectedUser.id !== 0 ? (
        <div className={styles['chat']}>
          <div className={styles['chat-info']}>
            <p>{displayedName}</p>
            <div className={styles['settings']}>
              <Search />
              <MoreVertical />
            </div>
          </div>
          <Posts postList={postList} />
          <form className={styles['input-form']}>
            <input
              value={message}
              placeholder="Write a message..."
              className={styles['input-message']}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              onClick={messagePost}
              className={styles['send-message-btn']}
            >
              <SendHorizontal color="#bebebe" />
            </button>
          </form>
        </div>
      ) : (
        ' '
      )}
    </main>
  );
}
