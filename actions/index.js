const fetchNotebooksAction = () => dispatch => {
     fetch('http://1ed3529e0b8d.ngrok.io/api/v1/notebooks')
    .then(resp => resp.json())
    .then(notebooks => dispatch({type: 'FETCH_NOTEBOOKS', payload: {notebooks}}))
}
const fetchNotesAction = () => dispatch => {
    fetch('http://1ed3529e0b8d.ngrok.io/api/v1/notes')
   .then(resp => resp.json())
   .then(notes => dispatch({type: 'FETCH_NOTES', payload: {notes}}))
}
const selectNotebookAction = (id) => ({type: 'SELECT_NOTEBOOK', payload: {value: id}})
const selectNoteAction = (id) => ({type: 'SELECT_NOTEBOOK', payload: {value: id}})
// let addLike = (toyId) => ({type: 'ADD_LIKE', payload: {id: toyId}})
// let donateToy = (toyId) => ({type: 'DELETE_TOY', payload: {value: toyId}})
// let addToy = (toy) => ({type: "ADD_TOY", payload: {value: toy}})

export {
    fetchNotebooksAction,
    selectNotebookAction,
    fetchNotesAction, 
    selectNoteAction
    // addLike,
    // donateToy,
    // addToy
}