import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import allReducers from './reducers';

import LoginScreen from './containers/LoginScreen'
import NotebooksPage from './containers/NotebooksPage'
import CameraContainer from './containers/CameraContainer'

const store = createStore(allReducers, applyMiddleware(thunk));
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="NotebooksPage" component={NotebooksPage} />
          <Stack.Screen name="CameraContainer" component={CameraContainer} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
