import React, { useState } from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Button, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {Picker} from '@react-native-community/picker';
import { connect } from 'react-redux'
import { setExtractedAction} from '../actions'
import { selectNotebookAction} from '../actions'
import { selectNoteAction} from '../actions'

const NewNotePage=({extracted, notebooks, currentNotebook, imageData, imagePath, setExtracted, selectNotebook, selectNote,navigation})=>{
    const [title, setTitle] = useState('')

    //all fetches use nrok because of physical device in demo
    //no redux for POSTs
    const handleSubmit=()=>{
      fetch('http://54aba409e9cf.ngrok.io/api/v1/notes',{
        method: 'POST',
        headers : {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }, 
        body: 
        JSON.stringify(
          { title: title,
            content: extracted,
            notebook_id: currentNotebook
          }
        )
      })
      .then(resp=>resp.json())
      .then(newNote => 
        {
        selectNote(newNote.id)
        navigation.navigate('NoteTranslatePage')}
      )
    }

    return (
      //prevents keyboard from blocking some parts of the screen
      <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >

      <View style={styles.container}>
        <ScrollView style={{height: 500}}> 
          <Picker
            selectedValue={currentNotebook}
            style={{height: 200, width: 300, marginTop:-40}}
            itemStyle={{fontWeight: '300', fontSize:17, color:'charcoal' }}
            onValueChange={ value => selectNotebook(value)}>
              {notebooks.map(notebook=>
              <Picker.Item label={notebook.notebook_name} value={notebook.id} key={notebook.id} />
              )}
          </Picker>
          <TextInput
                onChangeText={(title) => setTitle(title)}
                value={title}
                placeholder={"Add Title"}
                style={styles.title}
            />
            <TextInput 
                multiline={true}
                onChangeText={ extracted => setExtracted(extracted)}
                value={extracted}
                style={styles.text}
            />

        </ScrollView>
        <Button
                onPress={()=>handleSubmit()}
                title='Submit'
            />
      </View>

      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
      marginLeft : 10,
      marginRight: 10,
      marginBottom: 20
    },
    title: {
      color: '#333',
      fontWeight: '200',
      marginBottom: 20,
      fontSize: 30
    },
    text: {
      marginBottom: 20,
      marginTop: 10,
      fontSize: 20,
      fontWeight: '200',
    }
});

const mapStateToProps = state => {
  return {       
      extracted: state.extracted,
      imageData: state.imageData,
      imagePath: state.imagePath,
      notebooks: state.notebooks,
      currentNotebook: state.currentNotebook
  }
}

  const mapDispatchToProps = dispatch => {
    return {
      setExtracted: (extractedText) => dispatch(setExtractedAction(extractedText)),
      selectNotebook: (id) => dispatch(selectNotebookAction(id)),
      selectNote: (id) => dispatch(selectNoteAction(id))
    }
  }
export default connect (mapStateToProps, mapDispatchToProps)(NewNotePage)








