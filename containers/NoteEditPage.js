import React, { useState } from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { fetchNotesAction } from '../actions'

const NoteEditPage = (props)=>{
  const navigation = useNavigation()
  const thisNote = props.notes.find(note=>note.id===props.currentNote)
  const [title, setTitle] = useState(thisNote.title)
  const [content, setContent] = useState(thisNote.content)
  const [translated, setTranslated] = useState(thisNote.translated)

  //all fetches use nrok because of physical device in demo
  //no redux for POSTs
  const handleSubmit=()=>{
    fetch(`http://54aba409e9cf.ngrok.io/api/v1/notes/${props.currentNote}`,{
      method: 'PATCH',
      headers : {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }, 
      body: JSON.stringify(
        { 
          title: title,
          content: content,
          translated: translated
        }
      )
    })
    .then(resp=>resp.json())
    .then(newNote => 
      {props.fetchNotes()
        navigation.navigate('NoteDetailPage')}
    )
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ marginTop: 60, height: 500 }}>
          <ScrollView>
            <TextInput
              onChangeText={(title) => setTitle(title)}
              value={title}
              placeholder={"Add Title"}
              style={styles.title}/>
            <TextInput 
              multiline={true}
              onChangeText={(translated) => setTranslated(translated)}
              value={translated}
              style={styles.text2}/>
            <TextInput 
              multiline={true}
              onChangeText={(content) => setContent(content)}
              value={content}
              style={styles.text1}/>

          </ScrollView>
          <View style={{justifyContent:'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={()=>handleSubmit()}>
              <Image style={styles.button2} source={require('./check.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#333',
    fontWeight: '200',
    marginBottom: 20,
    marginLeft: 5,
    fontSize: 50
  },
  text2: {
    marginTop: 20,
    marginLeft: 5,
    fontSize: 20,
    fontWeight: '200',
  },
  text1: {
    marginTop: 20,
    marginLeft: 5,
    fontSize: 20,
    fontWeight: '100',
  },
  button2:{
    width: 40,
    height:40,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10
  }
});

const mapStateToProps = state => {
  return {       
    extracted: state.extracted,
    notes: state.notes,
    currentNote: state.currentNote
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotesAction())
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(NoteEditPage)