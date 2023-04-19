import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import MainNavigator from './src/navigations/index';
import { appStore, persistor } from './src/helpers/AppStore';

function App() {
  return (
    <Provider store={appStore}>
      <PersistGate loading={<Text>Welcome...</Text>} persistor={persistor}>
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
}

export default App;


