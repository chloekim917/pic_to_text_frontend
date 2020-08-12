import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Button} from 'react-native';
// import { connect } from 'react-redux'
// import {getNotebooks} from '../actions/notebookActions'

class Note extends Component {

  render() {
    return (
        <View>
            <Text>{this.props.title}</Text>
        </View>
    );
  }
}

export default Note