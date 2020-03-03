import axios from "axios";
import queryString from 'query-string';

let headers = {
    "x-access-token": localStorage.getItem('token')
};


// MIDDLEWARE
export const getProjects = (options) => {
    return (dispatch) => {
        // Local action HERE dispatched

        axios.get('/api/projects?' + queryString.stringify(options), {
            headers: headers
        })
            .then(res => {
                dispatch({
                    type: "UPDATE_PROJECTS",
                    payload: res.data
                })
            })
    }
}

export const updateProject = (newData) => {
    return (dispatch) => {
        console.log("UPDATE PROJECT FIRED")
        console.log(newData);
        axios.put("/api/project",
            newData,
            {
                headers: headers,
            })
            .then(res => {
                if (res.data === "ok") {
                    console.log(res.data)
                    dispatch({
                        type: "UPDATE_PROJECT",
                        payload: newData
                    })
                }
            })
    }
}

export const deleteProject = (projectId) => {
    return (dispatch) => {
        axios.delete('/api/project/' + projectId,
            { headers: headers }
        ).then(res => {
            if (res.data === "ok") {
                dispatch({
                    type: 'REMOVE_PROJECT',
                    payload: {
                        idToRemove: projectId
                    }
                })
            }
        })
    }
}
