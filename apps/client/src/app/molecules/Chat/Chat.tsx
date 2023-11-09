import { useEffect, useState } from 'react';
import { useChat } from '../../stores/chat';
import { io } from 'socket.io-client';
import { useLogin } from '../../stores/login';
import { Message } from '../../interfaces';
import Posts from '../../atoms/Posts/Posts';
import getMessages from '../../api/getMessages';
import styles from './Chat.module.scss';
import { Paperclip, SendHorizontal } from 'lucide-react';
import Settings from '../../atoms/Settings/Settings';

const socket = io('ws://localhost:3000/chat');

export default function Chat() {
  const [postList, setPostList] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const { selectedUser, chooseUser } = useChat();
  const { user } = useLogin();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    console.log(file);
  };

  useEffect(() => {
    getMessages().then((res) => {
      setPostList(res);
      console.log(res);
    });

    const backToMenu = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        chooseUser({
          id: 0,
          name: 'Remessenger',
          email: '',
          password: '',
          avatar: '',
        });
      }
    };

    document.addEventListener('keydown', backToMenu);

    function onRecMessage(message: Message) {
      setPostList((prev) => [...prev, message]);
    }

    socket.on('recMessage', onRecMessage);

    return () => {
      document.removeEventListener('keydown', backToMenu);
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

  return (
    <main className={styles['chat-container']}>
      {selectedUser.id !== 0 ? (
        <div className={styles['chat']}>
          <Settings />
          <Posts postList={postList} />
          <form className={styles['input-form']}>
            <div className={styles['select-file-btn']}>
              <input type="file" onChange={handleFileChange} />
              <label htmlFor="file">
                <Paperclip />
              </label>
            </div>
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
        <div className={styles['select-chat-menu']}>
          <Settings />
          <div className={styles['select-chat-text']}>
            <p>Select a chat to start messaging</p>
          </div>
        </div>
      )}
    </main>
  );
}
