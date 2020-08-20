import * as React from 'react';
import { Button, View, StyleSheet, Image, Dimensions} from 'react-native';
import Camera from '../components/Camera'


function CameraContainer({ navigation }) {
  return (
    <View style={styles.container}>
        <Camera />
    </View>
  );
}
      
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },  
    container1: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: Dimensions.get('screen').width,
      height: 80,
    },
    icons: {
      height: 80,
      width: 80
    },
    iconBack: {
      height: 50,
      width: 50
    }

})
      
export default CameraContainer;
      