import React from 'react'
import {ScrollView, View, Text, StyleSheet, TextInput, Button, FlatList} from 'react-native';
import Note from '../components/Note'
import { connect } from 'react-redux'
import * as act from '../actions'

class NotesPage extends React.Component {  

  componentDidMount(){
    this.fetchNotes()
  }

  fetchNotes = () => {
    fetch('http://localhost:3000/api/v1/notes')
    .then(resp => resp.json())
    .then(notes => this.props.renderNotes(notes))
  }

  render(){
      
    return(
      <View>
         {this.props.notes.notes.map(note => <Note key={note.id} {...note}/>)}
      </View>
    )        
  }
}

const mapStateToProps = state => {
  return {       
      notes: state.notes
  }
}

const mapDispatchToProps = dispatch => {
  return {
      renderNotes: (notes) => dispatch(act.renderNotes(notes))
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(NotesPage)

