import { useState } from 'react';
import { useChat } from './store';
import Posts from '../../atoms/Posts/Posts';
import styles from './Chat.module.scss'

const ws = new WebSocket('ws://localhost:8000/ws/1');

export default function Chat() {
  const [postList, setPostList] = useState([]);

  ws.addEventListener('open', () => {
    console.log('loaded!');

    ws.onmessage = async (e) => {
     console.log(e);
     const response = e.data

      console.log(response);
      if (response) {
        setPostList((prev) => [...prev, response])
      }
    };
  });

  const selectedUser = useChat((state) => state.user);
  const [message, setMessage] = useState(' ');

  function messagePost(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    ws.send(message)
    console.log("sended");
    setMessage('');
  }

  return (
    <div>
      <div>
        {selectedUser.user_id !== 0 ? (
          <div className={styles["chat"]}>
            <p>{selectedUser.user_name}</p>
            <Posts postList={postList} />
            <form className=''>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" onClick={messagePost}>
                Post message
              </button>
            </form>

          </div>
        ) : (
          ' '
        )}
      </div>
    </div>
  );
}
