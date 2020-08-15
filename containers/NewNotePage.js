import React, { useState } from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
import FitImage from 'react-native-fit-image';
import { connect } from 'react-redux'
import { setExtractedAction} from '../actions'

const NewNotePage=({extracted, imagePath, setExtracted})=>{
    const [title, setTitle] = useState('')

    const handleSubmit=()=>{

    }

    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={(title) => setTitle({ title })}
                value={title}
                placeholder={"Add Title"}
                style={styles.title}
            />
            <FitImage
                indicator={true}
                indicatorColor='gray'
                indicatorSize='small'
                source={{ uri: imagePath }}
                resizeMode="cover"
                style={styles.image}
            />
            <TextInput 
                multiline={true}
                onChangeText={ extracted => setExtracted(extracted)}
                value={extracted}
                style={styles.text}
            />
            <Button
                onPress={()=>handleSubmit()}
                title='Submit'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      paddingVertical: 8,
      paddingHorizontal: 16
    },
    title: {
      marginBottom: 8,
      color: '#333',
      fontWeight: 'bold',
      fontSize: 16
    },
    text: {
      marginBottom: 8,
    },
    image: {
        flex: 1,
        alignSelf: 'stretch'
    }
  });

const mapStateToProps = state => {
  return {       
      extracted: state.extracted,
      imagePath: state.imagePath
  }
}

  const mapDispatchToProps = dispatch => {
    return {
        setExtracted: (extractedText) => dispatch(setExtractedAction(extractedText))
    }
  }
export default connect (mapStateToProps, mapDispatchToProps)(NewNotePage)
