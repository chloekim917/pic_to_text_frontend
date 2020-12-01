//actions index
const fetchNotebooksAction = () => dispatch => {
     fetch('http://54aba409e9cf.ngrok.io/api/v1/notebooks')
    .then(resp => resp.json())
    .then(notebooks => dispatch({type: 'FETCH_NOTEBOOKS', payload: {notebooks}}))
}
const fetchNotesAction = () => dispatch => {
    fetch('http://54aba409e9cf.ngrok.io/api/v1/notes')
   .then(resp => resp.json())
   .then(notes => dispatch({type: 'FETCH_NOTES', payload: {notes}}))
}
const selectNotebookAction = (id) => ({type: 'SELECT_NOTEBOOK', payload: {value: id}})
const selectNoteAction = (id) => ({type: 'SELECT_NOTE', payload: {value: id}})
const setImageDataAction = (pic) => ({type: 'SET_IMAGE_DATA', payload: {value: pic}})
const setImagePathAction = (picPath) => ({type: 'SET_IMAGE_PATH', payload: {value: picPath}})
const setExtractedAction = (extractedText) => ({type: 'SET_EXTRACTED', payload: {value:extractedText}})
const setConfidenceAction = (confidenceRate) => ({type: 'SET_CONFIDENCE', payload: {value:confidenceRate}})
const setTranslatedAction = (translatedText) => ({type: 'SET_TRANSLATED', payload: {value:translatedText}})

export {
    fetchNotebooksAction,
    selectNotebookAction,
    fetchNotesAction, 
    selectNoteAction,
    setImageDataAction,
    setImagePathAction,
    setExtractedAction,
    setConfidenceAction,
    setTranslatedAction
}