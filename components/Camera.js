'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CameraRoll from "@react-native-community/cameraroll";
import firebase from '@react-native-firebase/app';
import vision from '@react-native-firebase/ml-vision';
import { connect } from 'react-redux'
import {setPathAction} from '../actions'
import {setExtractedAction} from '../actions'
import {setConfidenceAction} from '../actions'
import { useNavigation } from '@react-navigation/native'

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightblue',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Loading</Text>
  </View>
);

const Camera=(props)=>{
  const navigation = useNavigation()

  const CapturedView = () => (
    <>
      <Image
        source={{ uri: props.path }}
        style={styles.preview}
      />
      <Text
        style={styles.cancel}
        onPress={() => props.setPath(null)}
      >Discard</Text>
      <Text
        style={styles.extract}
        onPress={()=>handleExtract()}
      >Extract Text</Text>
    </>
  )

  const CameraView = () => (
    <RNCamera
      style={styles.preview}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.auto}
      captureAudio={false}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',}}>
      {({ camera, status }) => {
        if (status !== 'READY') return <PendingView />;
        return (
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity>
          </View>
        );
      }}
    </RNCamera>
  )

  const takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);

    CameraRoll.save(data.uri,'photo')
    const picPath = data.uri

    props.setPath(picPath);
  };

  const handleExtract = async function(localPath){
    const processed = await vision().cloudDocumentTextRecognizerProcessImage(props.path)
    const extractedText = processed.text
    
    props.setExtracted(extractedText)
      processed.blocks.forEach(block => {
        const confidenceRate = block.confidence
        props.setConfidence(confidenceRate)
      });
    navigation.navigate('NewNotePage')
  }

  return (
    <View style={styles.container}>
      {props.path ? <CapturedView/> : <CameraView/>}
    </View>
  )
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
  },
  previews: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  }
})

const mapStateToProps = state => {
  return {       
    path: state.path,
    extracted: state.extracted,
    confidence: state.confidence
  }
}

const mapDispatchToProps = dispatch => {
  return {
      setPath: (picPath) => dispatch(setPathAction(picPath)),
      setExtracted: (extractedText) => dispatch(setExtractedAction(extractedText)),
      setConfidence: (confidenceRate) => dispatch(setConfidenceAction(confidenceRate))
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(Camera)

AppRegistry.registerComponent('App', () => Camera);