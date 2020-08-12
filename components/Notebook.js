import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Button} from 'react-native';
// import { connect } from 'react-redux'
// import {getNotebooks} from '../actions/notebookActions'

class Notebook extends Component {

  render() {
    // console.log(this.props)
    return (
        <View>
            <Text>{this.props.notebook_name}</Text>
        </View>
    );
  }
}

export default Notebook