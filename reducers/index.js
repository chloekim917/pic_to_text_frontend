// import { combineReducers } from 'redux';

const initialState = {
    notebooks: [],
    currentNotebook: 1,
    notes: [],
    currentNote: 1
}


const reducer  = (prevState=initialState, action) => {
    switch(action.type){
        case 'FETCH_NOTES':
            return {...prevState, notes: action.payload.notes}
        case 'SELECT_NOTE':
            return{...prevState, currentNote: action.payload.value}
        case 'FETCH_NOTEBOOKS':
            return {...prevState, notebooks: action.payload.notebooks}
        case 'SELECT_NOTEBOOK':
            return{...prevState, currentNotebook: action.payload.value}
        default:
            return prevState
    }
}

export default reducer;




// import { combineReducers } from 'redux';
// import notebookReducers from './notebookReducers'
// import noteReducers from './noteReducers'


// const allReducers = combineReducers({ 
// notebooks: notebookReducers,
// notes: noteReducers
// })

// export default allReducers;