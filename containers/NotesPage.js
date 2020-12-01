import React, { useState, useEffect } from 'react';
import {ScrollView, View, Text, StyleSheet, TouchableHighlight, Image, Dimensions} from 'react-native';
import Notes from '../components/Notes'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { fetchNotesAction } from '../actions'

const NotesPage=(props)=>{  
  const navigation = props.navigation

  useEffect(() => {
    props.fetchNotes()
  }, [])

  const thisNotebook = (props.notebooks[props.currentNotebook-1].notebook_name)

    return(
      <View style={styles.contianer}>
        <View style={styles.container0}></View>
        <View style={styles.container1}>
          <TouchableHighlight onPress={()=>navigation.navigate('NotebooksPage')} >
            <Image style={styles.plus} source={require('./back.png')}/>
          </TouchableHighlight>
          <Text style={{color:'white', fontSize: 30, fontWeight:'200'}}>{thisNotebook}</Text>
        </View>
        <View style={styles.container2}>
         {props.notes.filter(note => note.notebook_id === props.currentNotebook).map(note =>  <Notes key={note.id} {...note}/>)}
        </View>

      </View>
    )        
}
const styles = StyleSheet.create({
  contianer: {
    flexWrap: "wrap", 
    flexDirection: 'column',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  container0: {
    width: Dimensions.get('screen').width,
    height: 25,
    backgroundColor: '#3F3F3F'
  },
  container1: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: Dimensions.get('screen').width,
    height: 65,
    backgroundColor: '#3F3F3F'
  },
  title: {
    fontSize: 30,
    fontWeight: '200',
    color: '#f1f1f1'
  },
  openButton: {
    backgroundColor: "#93cedd",
    padding: 5,
    marginLeft: 7,
    marginRight: 7,
    marginTop: 20,
    marginBottom: -5,
    borderRadius: 10
  },
  plus: {
    marginLeft: -110,
    marginTop: 2,
    marginRight: 50,
    height: 32,
    width:32
  },
  container2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Dimensions.get('screen').width,
    marginLeft: 10,
    alignItems:'flex-start'
  },
  container3: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width,
    justifyContent:'center',
    alignItems:'center',
    marginTop: 28,
    marginBottom: 0,
    height: 90,
    backgroundColor: '#3F3F3F'
  },
  addTitle: {
    fontSize: 15,
    fontWeight: '300',
    color: '#f1f1f1',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#D2D2D2",
    borderRadius: 5
  },
  cameraButton:{
    height: 80,
    width: 80
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
    },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  buttonContainer: {
    flexWrap: "wrap", 
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 23,
    fontWeight: '900',
    color: '#93cedd'
  }
}) 
const mapStateToProps = state => {
  return {       
      notes: state.notes,
      currentNotebook: state.currentNotebook,
      notebooks: state.notebooks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: () => dispatch(fetchNotesAction()),
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(NotesPage)

