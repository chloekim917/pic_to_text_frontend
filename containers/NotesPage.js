import React, { useState, useEffect } from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Button, FlatList} from 'react-native';
import Notes from '../components/Notes'
import { connect } from 'react-redux'
import { fetchNotesAction } from '../actions'

const NotesPage=(props)=>{  
  const navigation = props.navigation

  useEffect(() => {
    props.fetchNotes()
    // console.log(props)
  }, [])

    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* {props.notes.notes.filter(note => note.notebook_id === props.currentNotebook).map(note => 
          <Text>{note.title}</Text>)} */}

         {props.notes.filter(note => note.notebook_id === props.currentNotebook).map(note =>  <Notes key={note.id} {...note}/>)}
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
    fetchNotes: () => dispatch(fetchNotesAction())
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(NotesPage)

