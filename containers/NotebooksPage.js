import React from 'react'
// import NotebookInput from '../components/NotebookInput'
import {ScrollView, View, Text, StyleSheet, TextInput, Button, FlatList} from 'react-native';
import Notebook from '../components/Notebook'
import { connect } from 'react-redux'
import * as act from '../actions'

class NoteBooksPage extends React.Component {  

  componentDidMount(){
    this.fetchNotebooks()
  }

  fetchNotebooks = () => {
    fetch('http://localhost:3000/api/v1/notebooks')
    .then(resp => resp.json())
    .then(notebooks => this.props.renderNotebooks(notebooks))
  }

  render(){
    return(
      <View>
         {this.props.notebooks.notebooks.map(notebook => <Notebook key={notebook.id} {...notebook}/>)}
      </View>
    )        
  }
}

const mapStateToProps = state => {
  return {       
      notebooks: state.notebooks
  }
}

const mapDispatchToProps = dispatch => {
  return {
      renderNotebooks: (notebooks) => dispatch(act.renderNotebooks(notebooks))
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(NoteBooksPage)

