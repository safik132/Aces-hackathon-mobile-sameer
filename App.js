import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/Components/Home';
import Rules from './src/Components/Rules';
import Registration from './src/Components/Registration';
import Tracks from './src/Components/Tracks';
import Importantdates from './src/Components/Importantdates';
import Awards from './src/Components/Awards';
import Events from './src/Components/Events';
import Main from './src/Components/Main';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name='Main'component={Main} />
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            headerLeft: null,
            headerTitle: () => (
              <Image
                source={require('./Images/Aces1.png')} // Replace with the actual path to your logo
                style={{ width: 120, height: 30 }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Stack.Screen name='Rules' component={Rules} />
        <Stack.Screen name='Registration' component={Registration} />
        <Stack.Screen name='Tracks' component={Tracks} />
        <Stack.Screen name='Importantdates' component={Importantdates} />
        <Stack.Screen name='Awards' component={Awards} />
        <Stack.Screen name='Events' component={Events} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
