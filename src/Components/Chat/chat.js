import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatBox.css';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);
    setIsTyping(true);
    const id =122333;

    try {
      // Send the user's message to the backend API
      const response = await axios.get(`http://chat_backend:5213/commonchat?query=${input}&session_id=${id}`);

      const botMessage = { text: response.data.answer, sender: 'bot' };
      // Simulate typing effect delay
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      const errorMessage = {
        text: error.response?.data?.message || 'Failed to connect to the server.',
        sender: 'bot'
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      setIsTyping(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="messages">
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              {msg.text}
            </div>
          ))}
          {isTyping && <div className="message bot-message typing">Typing...</div>} {/* First Instance */}
        </div>
        </div>
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            disabled={loading}
          />
          <button onClick={handleSendMessage} disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
