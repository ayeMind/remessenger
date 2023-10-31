import { useEffect, useState } from 'react';
import { useChat } from './store';
import Posts from '../../atoms/Posts/Posts';
import styles from './Chat.module.scss'
import { io } from 'socket.io-client';
import { SendHorizontal } from 'lucide-react';

const socket = io('ws://localhost:3000/chat');

export default function Chat() {
  const [postList, setPostList] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState('');
  const selectedUser = useChat((state) => state.user);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log("You connect!")
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessage(message: string) {
      setPostList((prev) => [...prev, message])
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessage)
    };
  }, []);

  function messagePost(event: React.MouseEvent) {
    event.preventDefault();
    if (!message.trim()) {
      setMessage("");
      return;
    }
    socket.send(message)
    console.log("sended");
    setMessage('');
  }

  return (
    <div>
        {selectedUser.user_id !== 0 ? (
          <div className={styles["chat"]}>
            <div className={styles["chat-info"]}>
              <p>{selectedUser.user_name}</p>
            </div>
            <Posts postList={postList} />
            <form className={styles["input-form"]}>
              <input
                value={message}
                placeholder='Write a message...'
                className={styles["input-message"]}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" onClick={messagePost} className={styles["send-message-btn"]}>
                <SendHorizontal color='#bebebe' />
              </button>
            </form>

          </div>
        ) : (
          ' '
        )}
    </div>
  );
}
