import * as React from 'react';
import { ImageBackground, StyleSheet, Text, Button, View } from 'react-native';

const image = { uri: "https://reactjs.org/logo-og.png" };

function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        {/* <Text style={styles.text}>Inside</Text> */}
        <Button title="Sign In" onPress={() => navigation.navigate('NotebooksPage')}/>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold"
  }
});

  export default LoginScreen
