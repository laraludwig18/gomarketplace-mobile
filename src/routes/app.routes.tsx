import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Cart from '../pages/Cart';

import Logo from '../assets/logo.png';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: true,
      headerTransparent: true,
      headerTitleAlign: 'center',
      cardStyle: { backgroundColor: '#EBEEF8' },
      headerTitle: () => <Image source={Logo} />,
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="Cart" component={Cart} />
  </App.Navigator>
);

export default AppRoutes;
