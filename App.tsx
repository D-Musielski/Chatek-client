import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootContext } from './context/RootContext';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { useRootContext } from './hooks/useRootContext'
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const context = useRootContext();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <RootContext.Provider value={context}>
          <Navigation colorScheme={colorScheme} />
        </RootContext.Provider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
