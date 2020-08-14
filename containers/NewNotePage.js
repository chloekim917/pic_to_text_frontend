import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';

// import { connect } from 'react-redux'
// import { selectNoteAction} from '../actions'

const NewNotePage=(props)=>{

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>new note</Text>
        </View>
    );
}

// const mapStateToProps = state => {
//   return {       
//       notes: state.notes,
//       currentNote: state.currentNote
//   }
// }

//   const mapDispatchToProps = dispatch => {
//     return {
//         choose: (id) => dispatch(selectNoteAction(id))
//     }
//   }
// export default connect (mapStateToProps, null)(NewNotePage)

export default NewNotePage