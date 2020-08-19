import React, { useState, useEffect } from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Button, FlatList} from 'react-native';
import Notes from '../components/Notes'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { fetchNotesAction } from '../actions'

const NotesPage=(props)=>{  
  const navigation = props.navigation

  useEffect(() => {
    props.fetchNotes()
    // reset()
  }, [])

    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ScrollView>
          {props.notes.filter(note => note.notebook_id === props.currentNotebook).map(note =>  <Notes key={note.id} {...note}/>)}
          <Button onPress={()=>navigation.navigate('NotebooksPage')} title='Back to All Notebooks'/>
        </ScrollView>
      </View>
    )        
}

const mapStateToProps = state => {
  return {       
      notes: state.notes,
      currentNotebook: state.currentNotebook
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotesAction()),
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(NotesPage)

