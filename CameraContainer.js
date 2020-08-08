import * as React from 'react';
import { Button, View, StyleSheet} from 'react-native';
import Camera from './Camera'


function CameraContainer({ navigation }) {
    return (
      <View style={styles.container}>
          <Camera />
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <Button
          title="Go back to first screen in stack"
          onPress={() => navigation.popToTop()}
        />
      </View>
    );
  }
      
    const styles = StyleSheet.create({
        container: {
            flex: 1
        }
    })
      
    export default CameraContainer;
      