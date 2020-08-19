import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import LoginScreen from './containers/LoginScreen'
import NotebooksPage from './containers/NotebooksPage'
import NotesPage from './containers/NotesPage'
import NoteDetailPage from './containers/NoteDetailPage'
import CameraContainer from './containers/CameraContainer'
import NewNotePage from './containers/NewNotePage'
import NoteTranslatePage from './containers/NoteTranslatePage'
import NoteEditPage from './containers/NoteEditPage'

// const store = createStore(allReducers, applyMiddleware(thunk));
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" headerMode='none'>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="NotebooksPage" component={NotebooksPage} />
          <Stack.Screen name="NotesPage" component={NotesPage} />
          <Stack.Screen name="NoteDetailPage" component={NoteDetailPage} />
          <Stack.Screen name="CameraContainer" component={CameraContainer} />
          <Stack.Screen name="NewNotePage" component={NewNotePage} />
          <Stack.Screen name="NoteTranslatePage" component={NoteTranslatePage} />
          <Stack.Screen name="NoteEditPage" component={NoteEditPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
