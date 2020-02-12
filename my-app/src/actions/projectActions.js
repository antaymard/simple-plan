import axios from "axios";
import queryString from 'query-string';

// export const getProjects = (payload) => {
//     console.log(window.location)
//     // API CALL
//     axios.get('/api/projects', {
//         headers: {
//             "x-access-token": localStorage.getItem('token')
//         }
//     })
//         .then(res => {
//             return {
//                 type: "UPDATE_PROJECTS",
//                 payload: payload
//             }
//         })
// }

// MIDDLEWARE
export const getProjects = (options) => {
    return (dispatch) => {
        // Local action HERE dispatched

        axios.get('/api/projects?' + queryString.stringify(options), {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        })
            .then(res => {
                dispatch({
                    type: "UPDATE_PROJECTS",
                    payload: res.data
                })
            })
    }
}