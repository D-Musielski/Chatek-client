import React from 'react';
import { RootContext } from '../context/RootContext';

export const useRootContext = (): RootContext => {
  const [username, setUsername] = React.useState('');

  const setCurrentUsername = (currentName: string): void => {
    setUsername(currentName);
  };

  return {
    username,
    setCurrentUsername
  }
}