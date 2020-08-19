import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AutoHeightImage from 'react-native-auto-height-image';
import { connect } from 'react-redux'
// import { fetchNotesAction } from '../actions'
// import { selectNoteAction} from '../actions'

const NoteDetailPage = (props)=>{
  const navigation = useNavigation()
  const thisNote = props.notes.find(note=>note.id===props.currentNote)

  const handleDelete=()=>{
    fetch(`http://ff9f34faf1f5.ngrok.io/api/v1/notes/${props.currentNote}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(()=> {
      navigation.navigate('NotebooksPage')
      // props.fetchNotes()
    })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:30, marginLeft: 10, marginRight:10 }}>
      <ScrollView>
        
        <Button onPress={()=>navigation.navigate('NoteEditPage')} title='Edit'/>
        <Button onPress={()=>handleDelete()} title='Delete' style={{marginTop: 30}}/>
        <Text>Title: {thisNote.title}</Text>
        <AutoHeightImage source={{ uri: thisNote.image_path }} width={300}/>
        <Text>Content: {thisNote.content}</Text>
        <Text>Translation: {thisNote.translated}</Text>
        <Button onPress={()=>navigation.navigate('NotesPage')} title='Back to Notes'/>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  return {       
      notes: state.notes,
      imagePath: state.imagePath,
      currentNote: state.currentNote
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchNotes: () => dispatch(fetchNotesAction())
//   }
// }
export default connect (mapStateToProps, null)(NoteDetailPage)