import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { selectNoteAction} from '../actions'

const Notes=({choose, title, id})=>{
  const navigation = useNavigation()

  const handleNotePress = () =>{
    navigation.navigate('NoteDetailPage')
    choose(id)
  }

    return (
      <TouchableOpacity onPress={() => handleNotePress()} style={{flex: 1, flexDirection: "column", flexWrap: 'wrap'}}>
         <Text style={{fontSize:20}}>{title}</Text>
      </TouchableOpacity>
    );
}

  const mapDispatchToProps = dispatch => {
    return {
        choose: (id) => dispatch(selectNoteAction(id))
    }
  }
export default connect (null, mapDispatchToProps)(Notes)
