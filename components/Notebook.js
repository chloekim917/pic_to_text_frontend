import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Button} from 'react-native';
// import { connect } from 'react-redux'
// import {getNotebooks} from '../actions/notebookActions'

const Notebook=(props)=>{

    return (
        <View>
            <Text 
            // onPress={() =>  navigation.navigate('UserHome')}
            >
              {props.notebook_name}
            </Text>
        </View>
    );

}

export default Notebook














// import React, {Component} from 'react';
// import {ScrollView, View, Text, StyleSheet, TextInput, Button} from 'react-native';
// // import { connect } from 'react-redux'
// // import {getNotebooks} from '../actions/notebookActions'

// class Notebook extends Component {

//   render() {
//     return (
//         <View>
//             <Text onPress={() => navigation.navigate('NotesPage')}>{this.props.notebook_name}</Text>
//         </View>
//     );
//   }
// }

// export default Notebook