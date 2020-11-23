const initialState = {
    notebooks: [],
    currentNotebook: null,
    notes: [],
    currentNote: null,
    imageData: null,
    imagePath: null,
    extracted: '',
    confidence: '',
    translated: '',
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
        case 'SET_IMAGE_DATA':
            return{...prevState, imageData: action.payload.value}
        case 'SET_IMAGE_PATH':
            return{...prevState, imagePath: action.payload.value}
        case 'SET_EXTRACTED':
            return{...prevState, extracted: action.payload.value}
        case 'SET_CONFIDENCE':
            return{...prevState, confidence: action.payload.value}
        case 'SET_TRANSLATED':
            return{...prevState, translated: action.payload.value}
        default:
            return prevState
    }
}

export default reducer;













