import React, { useState, useEffect } from 'react';
import {ScrollView, View, Text, Alert, Modal, StyleSheet, TextInput, Button, TouchableHighlight, Image, Dimensions, TouchableOpacity, FlatList} from 'react-native';
import Notebooks from '../components/Notebooks'
import { connect } from 'react-redux'
import {fetchNotebooksAction} from '../actions'
import { fetchNotesAction } from '../actions'

const NotebooksPage=(props)=>{
  const navigation = props.navigation
  const [newNotebookName, setNewNotebookName] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;

  useEffect(() => {
   props.fetchNotebooks()
   props.fetchNotes()
  }, [])

  const handleAddNotebook = () =>{
    fetch('http://54aba409e9cf.ngrok.io/api/v1/notebooks',{
        method: 'POST',
        headers : {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }, 
        body: JSON.stringify(
          {user_id: 1,
            notebook_name: newNotebookName}
        )
      })
      .then(resp=>resp.json())
      .then(newNoteBook => {
        setModalVisible(!modalVisible)
        props.fetchNotebooks()}
      )
      .catch((error) => {
        console.error('Error:', error);
      });
  }

    return (
      <View style={styles.contianer}>
      {/* <ScrollView style={{flexGrow:1}}> */}
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {Alert.alert("Modal has been closed.");}}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Notebook Name:</Text>
              <TextInput onChangeText={(newNotebookName) => setNewNotebookName(newNotebookName)}
                value={newNotebookName}
                placeholder={"Add Notebook Name"}
                style={styles.addTitle}/>
                <View style={styles.buttonContainer}>
                <TouchableHighlight style={styles.openButton} onPress={() => {setModalVisible(!modalVisible)}}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.openButton} onPress={() => {handleAddNotebook()}}>
                    <Text style={styles.textStyle}>Submit</Text>
                  </TouchableHighlight>
                </View>
            </View>
          </View>
        </Modal>
        <View style={styles.container0}></View>
        <View style={styles.container1}>
          <Text style={styles.title}>Notebooks</Text>
          <TouchableHighlight onPress={() => {setModalVisible(true);}} >
            <Image style={styles.plus} source={require('./plus.png')}/>
          </TouchableHighlight>
        </View>
        <View style={styles.container2}>
          {props.notebooks.map(notebook => <Notebooks key={notebook.id} {...notebook}/>)} 
        </View>
        <View style={styles.container3}>
          <TouchableOpacity onPress={() => navigation.navigate('CameraContainer')}>
            <Image style={styles.cameraButton} source={require('./cameraIcon.png')}/>
          </TouchableOpacity>
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
    backgroundColor: '#676767',
    padding: 5,
    marginLeft: 7,
    marginRight: 7,
    marginTop: 20,
    marginBottom: -5,
    borderRadius: 10
  },
  plus: {
    marginLeft: 50,
    marginRight: -100,
    height: 30,
    width:30
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
    fontWeight: "300",
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
    fontWeight: '100',
    color: 'black'
  }
});

const mapStateToProps = state => {
  return {
    notebooks: state.notebooks
  }
}

const mapDispatchToProps = dispatch => {
  return {
      fetchNotebooks: () => dispatch(fetchNotebooksAction()),
      fetchNotes: () => dispatch(fetchNotesAction())
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(NotebooksPage)