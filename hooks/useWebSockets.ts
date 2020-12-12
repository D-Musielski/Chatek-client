import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import {Message} from '../models'
interface Props {
  userId: string;
  onConnected?: () => void;
};

export const useWebSockets = ({ userId, onConnected }: Props) => {
  const ref = useRef<Socket>();
  const [messages, setMessages] = useState<Message[]>([]);
  
  const send = (msg: string, senderId: string) => {
    ref.current!.emit('new message', {
      content: msg,
      senderId,
      userId,
      date: new Date(),
    });
  };

  useEffect(() => {
    const socket = io('http://192.168.0.45:3000');
    // const socket = io('http://localhost:3000');
    
    socket.emit('joinRoom', userId);

    socket.on('new message', (msg: Message) => {
      setMessages((prev) => prev.concat(msg));
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on('connect', () => {
      if (onConnected) {
        onConnected();
      }
    });

    socket.on('reconnect', () => {
      socket.emit('joinRoom', userId);
    });

    ref.current = socket;

    return () => {socket.disconnect();}
  }, []);

  return {
    send,
    messages,
  };
};