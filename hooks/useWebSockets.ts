import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import {Message} from '../models'
interface Props {
  userId: string;
  onConnected?: () => void;
};

export const useWebSockets = ({ userId, onConnected }: Props) => {
  const ref = useRef<Socket>();
  const waitingMessage = [{
    content: 'Looking for partner...',
    senderId: 'System',
    userId,
    date: new Date(),
  }];
  const [messages, setMessages] = useState<Message[]>(waitingMessage);
  
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
    setMessages(waitingMessage);
  }

  const isTyping = (flag: boolean) => {
    flag ? ref.current!.emit('start typing') : ref.current!.emit('stop typing');
  }

  useEffect(() => {
    const socket = io('http://192.168.56.1:3000');
    // const socket = io('http://localhost:3000');

    socket.emit('joinRoom', userId);

    socket.on('new message', (msg: Message) => {
      setMessages((prev) => prev.concat(msg));
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on('connect', () => {
      console.log(socket);
       
      if (onConnected) {
        onConnected();
      }
    });

    socket.on('reconnect', () => {
      socket.emit('joinRoom', userId);
    });

    socket.on('new chat', () => {
      const newChatMessage = [{
        content: 'Partner found. Say Hi!',
        senderId: 'System',
        userId,
        date: new Date(),
      }];
      setMessages(newChatMessage);
    })

    socket.on('partner disconnected', () => {
      const disconnectedMessage = {
        content: 'Partner has disconnected.',
        senderId: 'System',
        userId,
        date: new Date(),
      };
      setMessages((prev) => prev.concat(disconnectedMessage));
    })

    socket.on('start typing', () => {
      const partnerTypingMessage = {
        content: 'Partner is typing...',
        senderId: 'System',
        userId,
        date: new Date(),
      };
      setMessages((prev) => prev.concat(partnerTypingMessage));
    })

    socket.on('stop typing', () => {
      setMessages(prev => 
        prev.filter(message => message.content !== "Partner is typing...")
      );
    })

    ref.current = socket;

    return () => {socket.disconnect();}
  }, []);

  return {
    send,
    newChat,
    messages,
    isTyping,
  };
};