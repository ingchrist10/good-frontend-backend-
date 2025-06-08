'use client';

import { useEffect, useState } from 'react';
import { useWebSocket } from '@/hooks/use-web-socket';

type Message = {
    user: string;
    message: string;
};

export default function CommunityPage() {
    const [message, setMessage] = useState('');
    const [token, setToken] = useState<string | null>(null);
  
    useEffect(() => {
        // In a real app, you'd get this from your auth context/storage
        const storedToken = localStorage.getItem('access_token');
        setToken(storedToken);
    }, []);

    const { messages, sendMessage, isConnected } = useWebSocket(token ? `ws://localhost:8000/ws/chat/?token=${token}` : '');

    const handleSendMessage = () => {
        if (message.trim()) {
            sendMessage(message);
            setMessage('');
        }
    };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
        <div className="p-4 bg-white border-b">
            <h1 className="text-xl font-bold text-center">Community Chat</h1>
            <p className="text-center text-sm text-gray-500">
                {isConnected ? 'Connected' : 'Disconnected'}
            </p>
        </div>
      <div className="flex-grow p-4 overflow-auto">
        <div className="max-w-3xl mx-auto">
            {messages.map((msg: Message, index: number) => (
                <div key={index} className="mb-4">
                    <p className="font-bold">{msg.user}</p>
                    <p className="bg-white p-3 rounded-lg shadow">{msg.message}</p>
                </div>
            ))}
        </div>
      </div>
      <div className="p-4 bg-white border-t">
        <div className="max-w-3xl mx-auto flex">
          <input
            type="text"
            className="flex-grow p-2 border rounded-l-md"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white p-2 rounded-r-md"
            disabled={!isConnected}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
} 