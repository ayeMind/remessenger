import React, { useState } from 'react';
import { ChatListItem } from '../../interfaces';
import SearchChat from '../../atoms/SearchChat/SearchChat';
import styles from './SelectChatPanel.module.scss';
import ChatPreviewList from '../../molecules/ChatPreviewList/ChatPreviewList';

const chatList: ChatListItem[] = [
  { id: 1, name: 'Roy Buchanan' },
  { id: 2, name: 'Nathan Carroll' },
  { id: 3, name: 'Janie Gregory' },
  { id: 4, name: 'Roy McCoy' },
  { id: 5, name: 'Jordan Williams' },
  { id: 6, name: 'Lucile Carter' },
  { id: 7, name: 'Hilda Wong' },
  { id: 8, name: 'Bettie Marshall' },
  { id: 9, name: 'Bertha Blair' },
  { id: 10, name: 'Lottie Garrett' },
  { id: 11, name: 'Donald Cunningham' },
  { id: 12, name: 'Christopher Ortega' },
  { id: 13, name: 'Ola Barker' },
  { id: 14, name: 'Albert Chandler' },
  { id: 15, name: 'Marc Watts' },
  { id: 16, name: 'Jeremiah Hill' },
];

export default function SelectChatPanel() {
  const [panelWidth, setPanelWidth] = useState(250);

  function handleMouseMove(e: MouseEvent) {
    // console.log('move');
    setPanelWidth(e.clientX);
  }

  function handleMouseDown(e: React.MouseEvent) {
    // console.log('down');

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseUp(e: MouseEvent) {
    e.stopPropagation();
    // console.log('Up');
    document.removeEventListener('mousemove', handleMouseMove);
  }

  return (
    <div
      className={styles['panel-container']}
      style={{ width: `${panelWidth}px` }}
    >
      <div
        className={styles['resize-handle']}
        onMouseDown={handleMouseDown}
      ></div>
      <SearchChat />
      <ChatPreviewList chatList={chatList} />
    </div>
  );
}
