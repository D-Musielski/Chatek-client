import React, { useContext, useEffect } from 'react';
import { StyleSheet, TextInput, Button   } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootContext } from '../context/RootContext'
import { useNavigation } from '@react-navigation/native'
import { View } from '../components/Themed';

export default function SettingsScreen() {
  const { username, setCurrentUsername } = useContext(RootContext);
  const navigation = useNavigation();
  let textInput: any = null;

  const onButtonPress = async () => {
    await AsyncStorage.setItem('username', username);
    navigation.navigate('Chat')
  }

  useEffect(() => {
    textInput.focus();
    const retrieveData = async () => {
      try {
          const value = await AsyncStorage.getItem('username');
          if (value !== null) {
              setCurrentUsername(value);
          }
      } catch (error) {
          // Error retrieving data
      }
    }

    retrieveData();
  }, []);
  
  return (
      <View style={styles.container}>
        <TextInput 
          ref={input => textInput = input} 
          style={styles.textInput} 
          autoCorrect={false} 
          onChangeText={text => setCurrentUsername(text)} 
          value={username} 
        />
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
