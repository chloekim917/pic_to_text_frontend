import React, { useState } from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { fetchNotesAction } from '../actions'

const NoteEditPage = (props)=>{
  const navigation = useNavigation()
  const thisNote = props.notes.find(note=>note.id===props.currentNote)
  const [title, setTitle] = useState(thisNote.title)
  const [content, setContent] = useState(thisNote.content)
  const [translated, setTranslated] = useState(thisNote.translated)

  const handleSubmit=()=>{
    fetch(`http://ff9f34faf1f5.ngrok.io/api/v1/notes/${props.currentNote}`,{
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView>
        <TextInput
          onChangeText={(title) => setTitle(title)}
          value={title}
          placeholder={"Add Title"}
          style={styles.title}/>
        <TextInput 
          multiline={true}
          onChangeText={(content) => setContent(content)}
          value={content}
          style={styles.text}/>
        <TextInput 
          multiline={true}
          onChangeText={(translated) => setTranslated(translated)}
          value={translated}
          style={styles.text}/>
        <Button
          onPress={()=>handleSubmit()}
          title='Submit'/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   marginLeft : 20,
  //   marginRight: 20,
  //   marginBottom: 20,
  //   marginTop: 20
  //   // marginBottom: 80,
  //   // paddingVertical: 8,
  //   // paddingHorizontal: 16,
  //   // alignItems: "center", 
  //   // justifyContent: "center"
  // },
  title: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
    marginTop: 20
  },
  text: {
    marginBottom: 20,
    fontSize: 20
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