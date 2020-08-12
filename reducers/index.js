import { combineReducers } from 'redux';
import notebookReducers from './notebookReducers'
// import notesReducer from './notesReducer'


const allReducers = combineReducers({ 
notebooks: notebookReducers,
// notes: notesReducer
})

export default allReducers;