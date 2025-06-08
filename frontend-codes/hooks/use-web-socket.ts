'use client';

import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

type Message = {
    user: string;
    message: string;
}

export const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!url) return;

    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log('connected');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      setMessages((prev: Message[]) => [...prev, JSON.parse(event.data)]);
    };

    ws.onclose = () => {
      console.log('disconnected');
      setIsConnected(false);
    };
    
    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ message }));
    }
  };

  return { messages, sendMessage, isConnected };
}; 