import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';
import { RootContext } from '../context/RootContext'
import { useNavigation } from '@react-navigation/native'
import { View } from '../components/Themed';

export default function SettingsScreen() {
  const { username, setCurrentUsername } = useContext(RootContext);
  const [ name, setName ] = useState(username);
  const navigation = useNavigation();
  let textInput: any = null;

  const onButtonPress = (): void => {
    setCurrentUsername(name);
    navigation.navigate('Chat')
  }

  useEffect(() => {
    textInput.focus();
  }, []);
  
  return (
      <View style={styles.container}>
        <TextInput ref={input => textInput = input} style={styles.textInput} autoCorrect={false} onChangeText={text => setName(text)} value={name} />
        <Button
          onPress={onButtonPress}
          title="Start"
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
  textInput: {
    border: '1px solid black',
    fontSize: 16,
    color: 'orangered'
  },
});
