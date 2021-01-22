import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Settings: {
            screens: {
              SettingsScreen: 'Settings',
            },
          },
          Chat: {
            screens: {
              ChatScreen: 'Chat',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
