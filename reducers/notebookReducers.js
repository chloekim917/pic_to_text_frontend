// import * as types from '../actions';
const initialState = {
    notebooks: []
}

 const notebookReducers = (prevState=initialState, action) => {
    switch(action.type){
        case 'RENDER_NOTEBOOKS':
            return {...prevState, notebooks: action.payload.value}

        // case types.ADD_NOTEBOOK:
        //    // console.log(action.notebook)
        //     console.log(action)
        //     //return state.concat(action.notebook)
        //     return [...state, action.notebook]

        // case types.UPDATE_NOTEBOOK:
        //     return state.map(notebook => notebook.id === action.notebook.id ? action.notebook : notebook)
        
        // case types.DELETE_NOTEBOOK:
        //     const notebooks = state.filter(notebook => notebook.id !== action.notebookId)
        //     return notebooks

        default:
            return prevState       
    }
}
export default notebookReducers