import { Paperclip, SendHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useChat } from '../../stores/chat';
import { io } from 'socket.io-client';
import { useLogin } from '../../stores/login';
import { Message } from '../../interfaces';
import Posts from '../../atoms/Posts/Posts';
import getMessages from '../../api/getMessages';
import styles from './Chat.module.scss';
import Settings from '../../atoms/Settings/Settings';
import axios from 'axios';

const socket = io('ws://localhost:3000/chat');

export default function Chat() {
  const [postList, setPostList] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const { selectedUser, chooseUser } = useChat();
  const { user } = useLogin();
  const [file, setFile] = useState({})

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempFile = event.target.files?.[0]
    if (!tempFile) return;
    setFile({
      'lastModified'     : tempFile.lastModified,
      'name'             : tempFile.name,
      'size'             : tempFile.size,
      'type'             : tempFile.type 
   });

    const formData = new FormData();
    formData.append('file', tempFile);
    
    axios.post('http://localhost:3000/files', formData)
      .then(response => {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
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
      file: JSON.stringify(file)
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
