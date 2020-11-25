import React, { useContext, useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';
// import { io } from 'socket.io-client'
import { RootContext } from '../context/RootContext'
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  const { username, setCurrentUsername } = useContext(RootContext);
  // const [message, setMessage] = useState('');

  // let socket = io('http://192.168.0.45:3000');

  // socket.on('message', (message: string) => {
  //   setMessage(message);
  // })

  // const sendMessage = (message: string) => {
  //   socket.emit('message', message);
  // }

  useEffect(() => {
    setCurrentUsername('siemano')
  }, [])
  
  return (
      <View style={styles.container}>
        <TextInput autoCorrect={false} onChangeText={name => setCurrentUsername(name)} value={username} />
        <Text>
          Name: {username}
        </Text>
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
});
