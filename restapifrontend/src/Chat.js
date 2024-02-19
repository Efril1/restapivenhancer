import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat message', msg => {
      setMessages(messages => [...messages, msg]);
    });
  }, []);

  const submitMessage = e => {
    e.preventDefault();
    if (message) {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <ul id="messages">
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={submitMessage}>
        <input
          id="m"
          autoComplete="off"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default Chat;