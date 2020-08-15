// import React, {Component} from 'react';
// import {ScrollView, View, Text, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
// import { useNavigation } from '@react-navigation/native'
// import { connect } from 'react-redux'
// import { selectNoteAction} from '../actions'

// const Notes=({choose, title, id})=>{
//   const navigation = useNavigation()

//     return (
//       <TouchableOpacity onPress={() => navigation.navigate('NoteDetailPage')}>
//         {/* <Text onPress={() => choose(id) } > */}
//          <Text>{title}</Text>
//       </TouchableOpacity>
//     );
// }

//   const mapDispatchToProps = dispatch => {
//     return {
//         choose: (id) => dispatch(selectNoteAction(id))
//     }
//   }
// export default connect (null, mapDispatchToProps)(Notes)