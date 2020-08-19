import React, { useState, useEffect } from 'react';
import {ScrollView, View, Text, Alert, Modal, StyleSheet, TextInput, Button, TouchableHighlight, TouchableOpacity, FlatList} from 'react-native';
import Notebooks from '../components/Notebooks'
import { connect } from 'react-redux'
import {fetchNotebooksAction} from '../actions'
import { fetchNotesAction } from '../actions'

const NotebooksPage=(props)=>{
  const navigation = props.navigation
  const [newNotebookName, setNewNotebookName] = useState('')
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
   props.fetchNotebooks()
   props.fetchNotes()
  //  console.log(props)
  }, [])

  const handleAddNotebook = () =>{
    fetch('http://ff9f34faf1f5.ngrok.io/api/v1/notebooks',{
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
      // <View 
      // // style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      // >
        <ScrollView >
          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {Alert.alert("Modal has been closed.");}}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Notebook Name:</Text>
                <TextInput onChangeText={(newNotebookName) => setNewNotebookName(newNotebookName)}
                  value={newNotebookName}
                  placeholder={"Add Notebook Name"}
                  style={styles.title}/>
                <TouchableHighlight style={{ ...styles.openButton, backgroundColor: "#2196F3" }} onPress={() => {handleAddNotebook()}}>
                  <Text style={styles.textStyle}>Submit</Text>
                </TouchableHighlight>
                <TouchableHighlight style={{ ...styles.openButton, backgroundColor: "#2196F3" }} onPress={() => {setModalVisible(!modalVisible)}}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <TouchableHighlight style={styles.openButton} onPress={() => {setModalVisible(true);}} >
            <Text style={styles.textStyle}>Add New Notebook</Text>
          </TouchableHighlight>
          {props.notebooks.map(notebook => <Notebooks key={notebook.id} {...notebook}/>)} 
          <Button title="Camera" onPress={() => navigation.navigate('CameraContainer')}/>
        </ScrollView>
      // </View>
    )        
}

const styles = StyleSheet.create({
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
    padding: 35,
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
  openButton: {
    backgroundColor: "#F194FF",
    marginTop: 30,
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
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