import React from 'react';
import { RootContext } from '../context/RootContext';

export const useRootContext = (): RootContext => {
  const [username, setUsername] = React.useState('');
  // const [socket, setSocket] = useState(undefined);
  React.useEffect(() => {
    setTimeout(() => {
      setCurrentUsername('fdsdupa');
    }, 2000);
  }, [])

  const setCurrentUsername = (currentName: string): void => {
    console.log(currentName);
    setUsername(currentName);
  };

  return {
    username,
    setCurrentUsername
  }
}