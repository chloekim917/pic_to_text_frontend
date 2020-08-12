import { combineReducers } from 'redux';
import notebookReducers from './notebookReducers'
import noteReducers from './noteReducers'


const allReducers = combineReducers({ 
notebooks: notebookReducers,
notes: noteReducers
})

export default allReducers;