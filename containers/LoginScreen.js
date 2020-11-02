import * as React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';

function LoginScreen({ navigation }) {
  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
    <View style={styles.container}>
        <Text style={styles.logo}>TransPict</Text>
        <Image style={styles.language} source={require('./language.gif')}/>
        <Image style={styles.camera} source={require('./camera.gif')}/>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Id..." 
            placeholderTextColor="#003f5c"
            />
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            />
        </View>
        <View style={{marginTop: 10, flexDirection:'row', width: 250, justifyContent: 'space-between'}}>
          <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('NotebooksPage')}>
            <Text style={styles.loginText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('NotebooksPage')} >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
    </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"200",
    fontSize:50,
    color: 'black'
  },
  language:{
    marginBottom: -50,
    marginTop: 10,
    marginLeft: 150,
    width: 100,
    height: 80
  },
  camera:{
    marginTop:-5,
    marginBottom: -10
  },
  inputView:{
    width:"80%",
    backgroundColor:"#EAECEF",
    borderRadius:25,
    height:35,
    marginBottom:5,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:40,
    color:"black"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:115,
    backgroundColor:"#3F3F3F",
    borderRadius:10,
    height:40,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:5
  },
  loginText:{
    color:"white",
    fontSize: 15
  },
});

  export default LoginScreen
