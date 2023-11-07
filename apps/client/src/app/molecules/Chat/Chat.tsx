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
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState('');
  const selectedUser = useChat((state) => state.user);
  const { user } = useLogin();

  useEffect(() => {
    getMessages().then((res) => {
      setPostList(res);
      console.log(res);
    });

    function onConnect() {
      setIsConnected(true);
      console.log('You connect!');
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onRecMessage(message: Message) {
      setPostList((prev) => [...prev, message]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    socket.on('recMessage', onRecMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
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
      Author: user?.id,
      Chat: selectedUser.id,
      createdAt: Date.now(),
    });
    setMessage('');
  }

  return (
    <main className={styles['chat-container']}>
      {selectedUser.id !== 0 ? (
        <div className={styles['chat']}>
          <div className={styles['chat-info']}>
            <p>{selectedUser.name}</p>
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
              // onKeyDown={(e) => {
              //   e.key === 'Enter' && messagePost(e);
              // }}
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
