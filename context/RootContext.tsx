import React from 'react'

export interface RootContext {
  username: string;
  setCurrentUsername: (name: string) => void;
}

const initialState = {
  username: '',
  setCurrentUsername: () => {}
}

export const RootContext = React.createContext<RootContext>(initialState);