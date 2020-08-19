import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { selectNotebookAction} from '../actions'

const Notebooks=({select, notebook_name, id})=>{
  const navigation = useNavigation()

  const handleNotebookPress = () =>{
    navigation.navigate('NotesPage')
    select(id)
  }


    return (
        <View>
          <TouchableOpacity onPress={() => handleNotebookPress()}>
            {/* <Text onPress={() => select(id) } > */}
            <Text>
            {notebook_name}
            </Text>
              
          </TouchableOpacity>
        </View>
    );
}

  const mapDispatchToProps = dispatch => {
    return {
        select: (id) => dispatch(selectNotebookAction(id))
    }
  }

export default connect (null, mapDispatchToProps)(Notebooks)
