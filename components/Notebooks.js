import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Button, ImageBackground, TouchableOpacity, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { selectNotebookAction} from '../actions'

const Notebooks=({select, notebook_name, id})=>{
  const navigation = useNavigation()
  const { width, height } = Dimensions.get('screen');
  

  const handleNotebookPress = () =>{
    navigation.navigate('NotesPage')
    select(id)
  }

    return (
      <View >
        <TouchableOpacity onPress={() => handleNotebookPress()}>
          <ImageBackground source={require('./notebook.png')} style={{width:150, height:200,marginBottom: -20}}>
            <View style={{ width: 96, height: 20, backgroundColor: '#b2b2b2', marginLeft: 27, marginTop:65, justifyContent: 'center', alignItems:'center', borderRadius:0}}>
            <Text style={{color: 'white', fontWeight: '400'}}>
            {notebook_name}
            </Text>
            </View>
          </ImageBackground>
            
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
