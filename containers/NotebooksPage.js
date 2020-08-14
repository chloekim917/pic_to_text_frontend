import React, { useState, useEffect } from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Button, TouchableOpacity, FlatList} from 'react-native';
import Notebooks from '../components/Notebooks'
import { connect } from 'react-redux'
import {fetchNotebooksAction} from '../actions'

const NotebooksPage=(props)=>{
  const navigation = props.navigation

  useEffect(() => {
   props.fetchNotebooks()
   console.log(props)
  }, [])

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {props.notebooks.map(notebook => <Notebooks key={notebook.id} {...notebook}/>)} 
         <Button title="Camera" onPress={() => navigation.navigate('CameraContainer')}/>
      </View>
    )        
}

const mapStateToProps = state => {
  return {       
      notebooks: state.notebooks
  }
}

const mapDispatchToProps = dispatch => {
  return {
      fetchNotebooks: () => dispatch(fetchNotebooksAction())
  }
}


export default connect (mapStateToProps, mapDispatchToProps)(NotebooksPage)