import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';

const socket = io('https://jannat-aspireabroad.onrender.com'); // Update if needed

function ChatApp() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat(prev => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', {
        message,
        time: new Date().toLocaleTimeString(),
      });
      setMessage('');
    }
  };

  return (
    <>
    <MainNav/>
    <div className="max-w-xl mx-auto mt-16 p-6 bg-white rounded-xl shadow-lg border border-gray-200 mt-30 mb-10">
      <h2 className="text-2xl font-bold text-[#003366] mb-4 text-center">💬 Real-Time Chat</h2>


      <div className="h-72 overflow-y-auto space-y-3 p-3 bg-gray-100 rounded-lg mb-4">
        {chat.map((c, i) => (
          <div key={i} className="bg-white shadow-sm rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">{c.time}</p>
            <p className="text-gray-800">{c.message}</p>
          </div>
        ))}
      </div>

      {/* Input and button */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-[#003366] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default ChatApp;
