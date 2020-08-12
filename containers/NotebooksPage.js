import React, { useState, useEffect } from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Button, FlatList} from 'react-native';
import Notebook from '../components/Notebook'
import { connect } from 'react-redux'
import * as act from '../actions'

const NoteBooksPage=(props)=>{
  const navigation = props.navigation

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/notebooks')
    .then(resp => resp.json())
    .then(notebooks => props.renderNotebooks(notebooks))
  })

  // addFolder(()=>{
  //   fetch('http://localhost:3000/api/v1/notebooks', {
      
  //   })
  // })

    return (
      <View>
         {props.notebooks.notebooks.map(notebook => <Notebook key={notebook.id} {...notebook}/>)}
         {/* <Button title="Add New Folder" onPress={addFolder()}/> */}
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
      renderNotebooks: (notebooks) => dispatch(act.renderNotebooks(notebooks))
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(NoteBooksPage)








// import React from 'react'
// import {ScrollView, View, Text, StyleSheet, TextInput, Button, FlatList} from 'react-native';
// import Notebook from '../components/Notebook'
// import { connect } from 'react-redux'
// import * as act from '../actions'

// class NoteBooksPage extends React.Component {  

//   componentDidMount(){
//     this.fetchNotebooks()
//   }

//   fetchNotebooks = () => {
//     fetch('http://localhost:3000/api/v1/notebooks')
//     .then(resp => resp.json())
//     .then(notebooks => this.props.renderNotebooks(notebooks))
//     // console.log(this.props)
//   }

//   render(){
    
//     return(
//       <View>
//          {this.props.notebooks.notebooks.map(notebook => <Notebook key={notebook.id} {...notebook}/>)}
//       </View>
//     )        
//   }
// }

// const mapStateToProps = state => {
//   return {       
//       notebooks: state.notebooks
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//       renderNotebooks: (notebooks) => dispatch(act.renderNotebooks(notebooks))
//   }
// }

// export default connect (mapStateToProps, mapDispatchToProps)(NoteBooksPage)