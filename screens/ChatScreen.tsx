import React, { useContext, useState, useEffect } from 'react';
import { useWebSockets } from '../hooks/useWebSockets'
import { StyleSheet, TextInput, Button, Text } from 'react-native';
import { RootContext } from '../context/RootContext'
import { View } from '../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'

export default function ChatScreen() {
  const { username } = useContext(RootContext);
  const navigation = useNavigation();
  const [ message, setMessage ] = useState('');
  const { send, newChat, messages, isTyping, isPartnerConnected } = useWebSockets({
    userId: username
  });
  let textInput: any = null;

  const sendMessage = (msg: string, senderId: string) => {
    send(msg, senderId);
    isTyping(false);
    setMessage('');
    focusInput();
  }

  const newChatHandler = () => {
    newChat();
    setMessage('');
    focusInput();
  };
  
  const focusInput = () => {
    textInput.focus();
  }

  const handleOnChange = (text: string) => {    
    setMessage(text);
  }

  useEffect(() => {
    if (message.length === 1) {
      isTyping(true);
    } 

    if (message.length === 0) {
      isTyping(false);
    } 
  }, [message])

  useEffect(() => {
    focusInput();
    if (!username) {
      navigation.navigate('Settings');
    }
  }, []);  

  return (
      <View style={styles.container}>
        <ScrollView>
          {messages.map(m => 
            <Text key={Math.random().toString()} style={styles.text}>
              {m.senderId === username ? 'You' : m.senderId}: {m.content}
            </Text>
          )}
        </ScrollView>
        <TextInput 
          ref={input => textInput = input} 
          style={styles.textInput} 
          autoCorrect={false} 
          onChangeText={text => handleOnChange(text)} 
          value={message} 
          autoFocus 
        />
        <Button
          onPress={() => sendMessage(message, username)}
          title="Send"
          color="#841584"
          accessibilityLabel="Send message"
          disabled={!(!!message && isPartnerConnected)}
        />
        <Button
          onPress={() => newChatHandler()}
          title="New Chat"
          color="#841584"
          accessibilityLabel="New Chat"
          disabled={!isPartnerConnected}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    fontSize: 16,
    color: 'orangered'
  },
  textInput: {
    backgroundColor: 'white',
    border: '1px solid',
    width: 100
  }
});
