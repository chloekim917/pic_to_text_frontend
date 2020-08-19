import * as React from 'react';
import { ImageBackground, StyleSheet, Text, Button, View, TextInput, TouchableOpacity } from 'react-native';

const image = { uri: "https://reactjs.org/logo-og.png" };

function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={image} style={styles.image}> */}
        {/* <Text style={styles.text}>Inside</Text> */}
        {/* <Button title="Sign In" onPress={() => navigation.navigate('NotebooksPage')}/> */}


        <Text style={styles.logo}>TransPict</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            // onChangeText={text => this.setState({email:text})}
            />
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            // onChangeText={text => this.setState({password:text})}
            />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText} onPress={() => navigation.navigate('NotebooksPage')}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
      {/* </ImageBackground> */}
    </View>
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
    fontWeight:"bold",
    fontSize:50,
    color:"#FFC8E2",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#F9F871",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#AAA9BC",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  },
  // image: {
  //   flex: 1,
  //   resizeMode: "cover",
  //   justifyContent: "center"
  // }
});

  export default LoginScreen
