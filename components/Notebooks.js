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
      <View style={{display: "flex", flexDirection:'row', flexWrap: "wrap", margin:20, justifyContent:"space-between"}}>
        <TouchableOpacity onPress={() => handleNotebookPress()}>
          {/* <Text onPress={() => select(id) } > */}
          <ImageBackground source={require('./5f3d6524b5b29.png')} style={{width:110, height:170, flexGrow:1, alignItems: 'center', justifyContent:'center',}}>
            <Text>
            {notebook_name}
            </Text>
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
