import React from 'react';
const ChatHistory = ({ messages }) => {
  return (
    <div className={styles.chatHistory}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={message.type === 'user' ? styles.userMessage : styles.botMessage}
        >
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
