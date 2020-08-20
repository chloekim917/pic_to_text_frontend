import React, {Component} from 'react';
import {ImageBackground, View, Text, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
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
      <View>
        <TouchableOpacity onPress={() => handleNotePress()} >
          <ImageBackground source={require('./note.png')} style={{width:150, height:200,marginBottom: -20,}}>
              <View style={{ width: 96, height: 20, backgroundColor: '#b2b2b2', marginLeft: 27, marginTop:120, justifyContent: 'center', alignItems:'center', borderRadius:0}}>
              <Text style={{color: 'white', fontWeight: '400'}}>
                {title}</Text>
            </View>
            </ImageBackground>
        </TouchableOpacity>
      </View>

    );
}

  const mapDispatchToProps = dispatch => {
    return {
        choose: (id) => dispatch(selectNoteAction(id))
    }
  }
export default connect (null, mapDispatchToProps)(Notes)
