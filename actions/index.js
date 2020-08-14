const fetchNotebooksAction = () => dispatch => {
     fetch('https://a48bb44112da.ngrok.io/api/v1/notebooks')
    .then(resp => resp.json())
    .then(notebooks => dispatch({type: 'FETCH_NOTEBOOKS', payload: {notebooks}}))
}
const fetchNotesAction = () => dispatch => {
    fetch('https://a48bb44112da.ngrok.io/api/v1/notes')
   .then(resp => resp.json())
   .then(notes => dispatch({type: 'FETCH_NOTES', payload: {notes}}))
}
const selectNotebookAction = (id) => ({type: 'SELECT_NOTEBOOK', payload: {value: id}})
const selectNoteAction = (id) => ({type: 'SELECT_NOTEBOOK', payload: {value: id}})
const setPathAction = (picPath) => ({type: 'SET_PATH', payload: {value: picPath}})
const setExtractedAction = (extractedText) => ({type: 'SET_EXTRACTED', payload: {value:extractedText}})
const setConfidenceAction = (confidenceRate) => ({type: 'SET_CONFIDENCE', payload: {value:confidenceRate}})


export {
    fetchNotebooksAction,
    selectNotebookAction,
    fetchNotesAction, 
    selectNoteAction,
    setPathAction,
    setExtractedAction,
    setConfidenceAction
}