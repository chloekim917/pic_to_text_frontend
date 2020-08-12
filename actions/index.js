let renderNotebooks = (notebooks) => ({type: 'RENDER_NOTEBOOKS', payload: {value: notebooks}})
let renderNotes = (notes) => ({type: 'RENDER_NOTES', payload: {value: notes}})
// let addLike = (toyId) => ({type: 'ADD_LIKE', payload: {id: toyId}})
// let donateToy = (toyId) => ({type: 'DELETE_TOY', payload: {value: toyId}})
// let addToy = (toy) => ({type: "ADD_TOY", payload: {value: toy}})

export {
    renderNotebooks,
    renderNotes
    // addLike,
    // donateToy,
    // addToy
}