import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';
import { RootContext } from '../context/RootContext'
import { useNavigation } from '@react-navigation/native'
import { View } from '../components/Themed';

export default function SettingsScreen() {
  const { username, setCurrentUsername } = useContext(RootContext);
  const [ name, setName ] = useState(username);
  const navigation = useNavigation();

  const onButtonPress = (): void => {
    setCurrentUsername(name);
    navigation.navigate('TabTwo')
  }
  
  return (
      <View style={styles.container}>
        <TextInput style={styles.text} autoCorrect={false} onChangeText={text => setName(text)} value={name} />
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
  text: {
    fontSize: 16,
    color: 'orangered'
  },
});
