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
        fetch(`http://ff9f34faf1f5.ngrok.io/api/v1/notes/${props.currentNote}`)
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
        fetch(`http://ff9f34faf1f5.ngrok.io/api/v1/notes/${props.currentNote}`,{
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ScrollView>
            <Picker selectedValue={language} onValueChange={ value => setLanguage(value)}>
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
            <Button onPress={()=>handleTranslate()} title='Translate'/>
            <Text>Title: {title}</Text>
            <Text>Content: {content}</Text>
            <Text>Translated Content: {props.translated}</Text>
            <Button onPress={()=>handleSubmit()} title='Submit'/>
        </ScrollView>
      </View>
    );
}

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

