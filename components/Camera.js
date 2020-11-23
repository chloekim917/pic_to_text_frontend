'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, ImageBackground,  ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CameraRoll from "@react-native-community/cameraroll";
import firebase from '@react-native-firebase/app';
import vision from '@react-native-firebase/ml-vision';
import { connect } from 'react-redux'
import {setImageDataAction} from '../actions'
import {setImagePathAction} from '../actions'
import {setExtractedAction} from '../actions'
import {setConfidenceAction} from '../actions'
import { useNavigation } from '@react-navigation/native'


//Load screen
const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightblue',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Loading</Text>
  </View>
);

const Camera=(props)=>{
  const navigation = useNavigation()

  //shows the picture that was just taken
  const CapturedView = () => (
      <ImageBackground
        source={{ uri: props.imageData.uri }}
        style={styles.preview}>
        <View style={styles.previewContainer1}>
          <TouchableOpacity onPress={() => props.setImageData(null) && props.setImagePath(null)}>
            <Image style={styles.discard} source={require('./trashcan.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.previewContainer2}>
          <TouchableOpacity onPress={()=>handleExtract()} >
            <Image style={styles.extract} source={require('./extract.png')}/>
          </TouchableOpacity>
        </View>
      </ImageBackground>
  )

  //camera screen
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
          <View>
            <View style={styles.container1}>
            <Image style={styles.iconBack} source={require('./back.png')} onPress={() => navigation.goBack()}/>
              <Image style={styles.icons} source={require('./home.png')} onPress={() => navigation.navigate('NotebooksPage')}/>
            </View>
            <View style={styles.container2}>
              <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                <Image source={require('./cameraButton.png')}/>
              </TouchableOpacity>
            </View>

          </View>
        );
      }}
    </RNCamera>
  )

  const takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);

    CameraRoll.save(data.uri,'photo')

    const pic = data
    const picPath = data.uri

    props.setImageData(pic);
    props.setImagePath(picPath);
  };

  //text extraction w/ google cloud vision api
  const handleExtract = async function(localPath){
    const processed = await vision().cloudDocumentTextRecognizerProcessImage(props.imagePath)
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
      {props.imageData ? <CapturedView/> : <CameraView/>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  capture: {
    marginTop: 100,
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

  container1: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 20,
    width: Dimensions.get('screen').width,
    height: 400,
  },
  icons: {
    height: 60,
    width: 60,
    marginRight: 10
  },
  iconBack: {
    height: 40,
    width: 40,
    marginLeft: 15,
    marginTop: 10
  },  
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: Dimensions.get('screen').width,
    height: 80,
  },
  preview: {
    flex: 1,
  },
  previewContainer1: {
    alignItems: 'flex-end',
    flexDirection: 'column',
    width: Dimensions.get('screen').width,
    height: 70,
  },
  previewContainer2: {
    alignItems: 'center',
    flexDirection: 'column',
    width: Dimensions.get('screen').width,
    marginTop: 420,
    height: 70,
  },
  discard: {
    height: 40,
    width: 40,
    marginTop: 30,
    marginRight: 20
  },  
  extract: {
    height: 50,
    width: 50,
  }
})

const mapStateToProps = state => {
  return {       
    imageData: state.imageData,
    imagePath: state.imagePath,
    extracted: state.extracted,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      setImageData: (pic) => dispatch(setImageDataAction(pic)),
      setImagePath: (picPath) => dispatch(setImagePathAction(picPath)),
      setExtracted: (extractedText) => dispatch(setExtractedAction(extractedText)),
      setConfidence: (confidenceRate) => dispatch(setConfidenceAction(confidenceRate))
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(Camera)

AppRegistry.registerComponent('App', () => Camera);