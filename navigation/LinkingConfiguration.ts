import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              SettingsScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              ChatScreen: 'two',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
