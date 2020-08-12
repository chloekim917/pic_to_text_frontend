'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CameraRoll from "@react-native-community/cameraroll";
import firebase from '@react-native-firebase/app';
import vision from '@react-native-firebase/ml-vision';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

class Camera extends PureComponent {
  state={
    path: null,
    extracted: '',
    confidence: ''
  }
  
  renderCamera() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }
 
  takePicture = async function(camera) {
    const options = { quality: 1, base64: true };
    const data = await camera.takePictureAsync(options);
   

    // const processed = await vision().cloudDocumentTextRecognizerProcessImage(data.uri);
    // console.log('Found text in document: ', processed);
  
    // processed.blocks.forEach(block => {
    //   console.log('Found block with text: ', block.text);
    //   console.log('Confidence in block: ', block.confidence);
    //   console.log('Languages found in block: ', block.recognizedLanguages);
    // });

    CameraRoll.save(data.uri,'photo')

    this.setState({ path: data.uri });
    console.log(this.state.path)
  };


  renderImage(){
    return ( 
      <View style={styles.container}>
        <Image
          source={{ uri: this.state.path }}
          style={styles.previews}
        />
        <Text
          style={styles.cancel}
          onPress={() => this.setState({ path: null })}
        >Cancel</Text>
        <Text
          style={styles.extract}
          onPress={()=>this.handleExtract()}
        >Extract Text</Text>
      </View>
    );
  }


  handleExtract = async function(localPath){
    const processed = await vision().cloudDocumentTextRecognizerProcessImage(this.state.path)
    this.setState({extracted:processed.text})
      processed.blocks.forEach(block => {
        this.setState({confidence: block.confidence})
      });
    console.log(this.state.extracted)
    console.log(this.state.confidence)
  }

  render(){
    return (
      <View style={styles.container}>
        {this.state.path ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  previews: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: 'blue',
    fontWeight: '600',
    fontSize: 17,
  },
  extract: {
    position: 'absolute',
    right: 20,
    top: 40,
    backgroundColor: 'transparent',
    color: 'blue',
    fontWeight: '600',
    fontSize: 17,
  }
});
export default Camera

AppRegistry.registerComponent('App', () => Camera);