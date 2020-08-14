import * as React from 'react';
import { Button, View, Text } from 'react-native';

function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Sign In"
        onPress={() => navigation.navigate('NotebooksPage')}
      />
    </View>
  );
}

  export default LoginScreen
