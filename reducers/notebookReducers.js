
const initialState = {
    notebooks: [],
    currentNotebook: 1
}

 const notebookReducers = (prevState=initialState, action) => {
    switch(action.type){
        case 'FETCH_NOTEBOOKS':
            return {...prevState, notebooks: action.payload.notebooks}
        case 'SELECT_NOTEBOOK':
            return{...prevState, currentNotebook: action.payload.value}
        default:
            return prevState       
    }
}
export default notebookReducers