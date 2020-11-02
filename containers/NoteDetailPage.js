import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AutoHeightImage from 'react-native-auto-height-image';
import { connect } from 'react-redux'

const NoteDetailPage = (props)=>{
  const navigation = useNavigation()
  const thisNote = props.notes.find(note=>note.id===props.currentNote)

  const handleDelete=()=>{
    fetch(`http://54aba409e9cf.ngrok.io/api/v1/notes/${props.currentNote}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(()=> {
      navigation.navigate('NotebooksPage')
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{height:485}}>
        <Text style={styles.title}>{thisNote.title}</Text>
        <Text style={styles.text1}>{thisNote.content}</Text>
        <Text style={styles.text2}>{thisNote.translated}</Text>
      </ScrollView>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, marginTop: -5}}>
          <TouchableOpacity onPress={()=>navigation.navigate('NotesPage')}>
            <Image style={styles.button2} source={require('./blackback.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('NoteEditPage')}>
            <Image style={styles.button2} source={require('./edit.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>handleDelete()}>
            <Image style={styles.button2} source={require('./trash.png')}/>
          </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginLeft : 10,
    marginRight: 10,
    marginBottom: 20
  },
  button2: {
    width: 45,
    height:45,
    marginTop: 15,
    marginRight: 10
  },
  title: {
    color: '#333',
    fontWeight: '200',
    marginTop: 60,
    marginBottom: 20,
    marginLeft: 5,
    fontSize: 40
  },
  text2: {
    marginTop: 10,
    marginLeft: 5,
    fontSize: 20,
    fontWeight: '100',
  },
  text1: {
    marginTop: 20,
    marginLeft: 5,
    fontSize: 17,
    fontWeight: '100',
  },
});

const mapStateToProps = state => {
  return {       
      notes: state.notes,
      imagePath: state.imagePath,
      currentNote: state.currentNote
  }
}

export default connect (mapStateToProps, null)(NoteDetailPage)