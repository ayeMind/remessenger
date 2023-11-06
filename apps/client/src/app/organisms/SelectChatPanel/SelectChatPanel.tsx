import React, { useState } from 'react';
import SearchChat from '../../atoms/SearchChat/SearchChat';
import styles from './SelectChatPanel.module.scss';
import ChatPreviewList from '../../molecules/ChatPreviewList/ChatPreviewList';
import { useSearchFilter } from '../../atoms/SearchChat/store';

export default function SelectChatPanel() {
  const { filtered } = useSearchFilter(); // filtered is a list of ChatListItem with search filter

  const [panelWidth, setPanelWidth] = useState(250);
  function handleMouseMove(e: MouseEvent) {
    setPanelWidth(
      () => Math.min(Math.max(e.clientX, 200), window.innerWidth / 4) // panel width is between 200 and 1/4 of the screen
    );
  }

  function handleMouseDown(e: React.MouseEvent) {
    // hide scrollbar when resizing
    const panelContainer = document.querySelector(
      `.${styles['panel-container']}`
    );
    if (panelContainer) {
      panelContainer.classList.add(styles['hover-overflow-hidden']);
    }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseUp(e: MouseEvent) {
    const panelContainer = document.querySelector(
      `.${styles['panel-container']}`
    );

    if (panelContainer) {
      panelContainer.classList.remove(styles['hover-overflow-hidden']);
    }

    e.stopPropagation();
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
        style={{ left: `${panelWidth + 0.5}px` }} // Indent of the resize bar from the scrollbar
      ></div>
      <SearchChat />
      <ChatPreviewList chatList={filtered} />
    </div>
  );
}
