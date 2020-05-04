import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';
import AppContainer from './hooks';

const App: React.FC = () => (
  <AppContainer>
    <StatusBar barStyle="dark-content" backgroundColor="#EBEEF8" />
    <Routes />
  </AppContainer>
);

export default App;
