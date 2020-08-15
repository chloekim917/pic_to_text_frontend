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
const setImagePathAction = (picPath) => ({type: 'SET_IMAGE_PATH', payload: {value: picPath}})
const setExtractedAction = (extractedText) => ({type: 'SET_EXTRACTED', payload: {value:extractedText}})
const setConfidenceAction = (confidenceRate) => ({type: 'SET_CONFIDENCE', payload: {value:confidenceRate}})
// const setContentAction = (contentText) => ({type: 'SET_CONTENT', payload: {value: contentText}})

export {
    fetchNotebooksAction,
    selectNotebookAction,
    fetchNotesAction, 
    selectNoteAction,
    setImagePathAction,
    setExtractedAction,
    setConfidenceAction,
    // setContentAction
}