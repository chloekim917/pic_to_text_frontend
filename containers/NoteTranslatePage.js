import React, { useState, useEffect } from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import {Picker} from '@react-native-community/picker';
import { connect } from 'react-redux'
import { setTranslatedAction} from '../actions'
import { fetchNotesAction } from '../actions'
import Config from "react-native-config";

const NoteTranslatePage = (props)=>{
  const navigation = useNavigation()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [language, setLanguage] = useState('')
  const apiKey = Config.GOOGLE_API_KEY

    useEffect(() => {
        fetch(`http://54aba409e9cf.ngrok.io/api/v1/notes/${props.currentNote}`)
        .then(resp => resp.json())
        .then(notes => {
            setTitle(notes.title)
            setContent(notes.content)
        })
    }, [])

    const handleTranslate=()=>{
        fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(
            { q: props.extracted,
              target: language,
              key: apiKey
            }
          )
        })
        .then(resp => resp.json())
        .then(text => {
            props.setTranslated(text.data.translations[0].translatedText)
        })
    }

    const handleSubmit=()=>{
        fetch(`http://54aba409e9cf.ngrok.io/api/v1/notes/${props.currentNote}`,{
          method: 'PATCH',
          headers : {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }, 
          body: JSON.stringify(
            { 
              translated: props.translated
            }
          )
        })
        .then(resp=>resp.json())
        .then(newNote => 
          {props.fetchNotes()
          navigation.navigate('NotebooksPage')}
        )
      }

    return (
      <View style={styles.container}>
        <ScrollView style={{height:500}}>
            <Picker 
              selectedValue={language} 
              style={{height: 200, width: 300, marginTop:-40, marginBottom:10}}
              itemStyle={{fontWeight: '300', fontSize:17, color:'charcoal' }}
              onValueChange={ value => setLanguage(value)}>
                {/* style={{height: 50, width: 100}} */}
                <Picker.Item label='Arabic' value='ar' />
                <Picker.Item label='Chinese' value='zh' />
                {/* <Picker.Item label='Dutch' value='nl' /> */}
                <Picker.Item label='English' value='en' />
                <Picker.Item label='French' value='fr' />
                <Picker.Item label='German' value='de' />
                {/* <Picker.Item label='Greek' value='el' />
                <Picker.Item label='Hebrew' value='he' /> */}
                <Picker.Item label='Hindi' value='hi' />
                {/* <Picker.Item label='Indonesian' value='id' />
                <Picker.Item label='Irish' value='ga' />
                <Picker.Item label='Italian' value='it' /> */}
                <Picker.Item label='Japanese' value='ja' />
                <Picker.Item label='Korean' value='ko' />
                {/* <Picker.Item label='Polish' value='pl' /> */}
                <Picker.Item label='Portuguese' value='pt' />
                <Picker.Item label='Russian' value='ru' />
                <Picker.Item label='Spanish' value='es' />
            </Picker>
            {/* <Button style={styles.translate} onPress={()=>handleTranslate()} title='Translate'/> */}
            <Text style={styles.title}>{title}</Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1,}}/>
            <Text style={styles.originalText}>{content}</Text>
            <Text style={styles.text}>{props.translated}</Text>

        </ScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 30, marginRight: 30, marginTop: -5}}>
          <TouchableOpacity onPress={()=>handleTranslate()}>
            <Image style={styles.button} source={require('./translate.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>handleSubmit()}>
            <Image style={styles.button2} source={require('./check.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginLeft : 10,
    marginRight: 10,
    marginBottom: 20
    // marginBottom: 80,
    // paddingVertical: 8,
    // paddingHorizontal: 16,
    // alignItems: "center", 
    // justifyContent: "center"
  },
  button: {
    width: 75,
    height:75,
    marginTop: -3
    // color: '#21242A',
    // fontWeight: '200',
    // marginTop: -50,
    // marginBottom: -10,
    // fontSize: 30
  },
  button2: {
    width: 40,
    height:40,
    marginTop: 15,
    marginRight: 10
    // color: '#21242A',
    // fontWeight: '200',
    // marginTop: -50,
    // marginBottom: -10,
    // fontSize: 30
  },
  title: {
    color: '#333',
    fontWeight: '200',
    // marginTop: -30,
    marginBottom: 5,
    marginLeft: 5,
    fontSize: 30
  },
  originalText: {
    // marginBottom: 20,
    marginTop: 20,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '200',
  },
  text: {
    // marginBottom: 20,
    marginTop: 20,
    marginLeft: 5,
    fontSize: 20,
    fontWeight: '200',
  }
});

const mapStateToProps = state => {
  return {       
      extracted: state.extracted,
      currentNote: state.currentNote,
      translated: state.translated
  }
}

  const mapDispatchToProps = dispatch => {
    return {
        setTranslated: (translatedText) => dispatch(setTranslatedAction(translatedText)),
        fetchNotes: () => dispatch(fetchNotesAction())
    }
  }
export default connect (mapStateToProps, mapDispatchToProps)(NoteTranslatePage)

