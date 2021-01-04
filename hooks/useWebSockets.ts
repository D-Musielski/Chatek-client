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
    const message = {
      content: msg,
      senderId,
      userId,
      date: new Date(),
    };

    setMessages(messages.concat(message));
    ref.current!.emit('new message', message);
  };

  const newChat = () => {
    ref.current!.emit('new chat');
    setMessages([]);
  }

  useEffect(() => {
    const socket = io('http://192.168.1.19:3000');
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
    newChat,
    messages,
  };
};