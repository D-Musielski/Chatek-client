import React, { useContext, useState } from 'react';
import { useWebSockets } from '../hooks/useWebSockets'
import { StyleSheet, TextInput, Button, Text } from 'react-native';
import { io } from 'socket.io-client'
import { RootContext } from '../context/RootContext'
import { View } from '../components/Themed';
import { Message } from '../models'
import { ScrollView } from 'react-native-gesture-handler';

export default function SettingsScreen() {
  const { username } = useContext(RootContext);
  const [ message, setMessage ] = useState('');
  const { messages, send } = useWebSockets({
    userId: username
  });
  
  return (
      <View style={styles.container}>
        <ScrollView>
          {messages.map(m => 
            <Text key={m.content} style={styles.text}>
              {m.senderId}: {m.content}
            </Text>
          )}
        </ScrollView>
        <TextInput style={styles.textInput} autoCorrect={false} onChangeText={text => setMessage(text)} value={message} />
        <Button
          onPress={() => send(message, username)}
          title="Send"
          color="#841584"
          accessibilityLabel="Save name and start chatting"
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
    width: 100
  }
});
