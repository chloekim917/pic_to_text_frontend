// export const renderNotebooks= notebooks => {
//     return {
//         type: "RENDER_NOTEBOOKS",
//         payload: notebooks
//     }
// }






// import * as types from './actionTypes'

// export function fetchNotebooks() {
//     return async dispatch => {
//         try{
//             fetch('http://localhost:3000/api/v1/notebooks')
//         .then(resp=>resp.json())
//         .then(notebooks => {
//             dispatch({type: types.FETCH_NOTEBOOKS, notebooks})
//         })
//         } catch(error){
//             console.log(error)
//         }
        
//       } 
//   }