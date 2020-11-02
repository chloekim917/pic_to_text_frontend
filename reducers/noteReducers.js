const initialState = {
    notes: [],
    currentNote: 1
}

 const noteReducers = (prevState=initialState, action) => {
    switch(action.type){
        case 'FETCH_NOTES':
            return {...prevState, notes: action.payload.notes}
        case 'SELECT_NOTE':
            return{...prevState, currentNote: action.payload.value}

        default:
            return prevState       
    }
}
export default noteReducers