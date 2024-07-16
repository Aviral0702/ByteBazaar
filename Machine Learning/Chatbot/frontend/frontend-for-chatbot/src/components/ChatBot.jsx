import React, { useState, useRef, useEffect } from 'react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const clearChat = () => {
    setMessages([]);
  }
  
  useEffect(scrollToBottom, [messages]);

  const handleInputChange = (e) => setInputMessage(e.target.value);

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newMessage = { sender: 'User', text: inputMessage };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputMessage }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'Bot', text: data }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { sender: 'Bot', text: 'Sorry, I encountered an error.' }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className={`fixed bottom-5 right-5 w-96 bg-white rounded-lg shadow-lg ${isOpen ? 'h-[32rem]' : 'h-auto'}`}>
      <div 
        className="bg-blue-600 text-white p-3 rounded-t-lg cursor-pointer flex justify-between items-center"
        onClick={toggleChat}
      >
        <h3 className="text-xl font-semibold">Chat with us</h3>
        <button className="text-xl">{isOpen ? '▼' : '▲'}</button>
      </div>
      {isOpen && (
        <div className="flex flex-col h-[28rem]">
          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.sender === 'User' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${message.sender === 'User' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <strong>{message.sender}:</strong> {message.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full p-2 border rounded-lg mb-2"
            />
            <div className='flex flex-row gap-3 m-4'>
                <button 
                    onClick={sendMessage}
                    className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                Send
                </button>
                <button 
                    onClick={clearChat}
                    className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                Clear
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;