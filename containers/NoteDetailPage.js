import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
// import { selectNoteAction} from '../actions'

const NoteDetailPage=(props)=>{
  const navigation = useNavigation()
    // onPress={() => navigation.navigate('NotesPage')}

  const thisNote = props.notes.find(note=>note.id===props.currentNote)

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {thisNote.title}</Text>
        <Text>Content: {thisNote.content}</Text>
      </View>
    );
}

const mapStateToProps = state => {
  return {       
      notes: state.notes,
      currentNote: state.currentNote
  }
}

//   const mapDispatchToProps = dispatch => {
//     return {
//         choose: (id) => dispatch(selectNoteAction(id))
//     }
//   }
export default connect (mapStateToProps, null)(NoteDetailPage)