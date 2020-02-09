import axios from "axios";
import queryString from 'query-string';

// MIDDLEWARE
export const getJobs = (options) => {
    return (dispatch) => {
        // Local action HERE dispatched
        console.log(options)
        axios.get('/api/jobs?' + queryString.stringify(options), {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: "UPDATE_JOBS",
                    payload: res.data
                })
            })
    }
}

export const updateJob = (data) => {
    return (dispatch) => {
        // Local here
        axios.put('/api/job',
            data,
            {
                headers: {
                    "x-access-token": localStorage.getItem('token')
                },

            })
            .then(res => {
                if (res.data === "ok") {
                    dispatch({
                        type: "UPDATE_JOB",
                        payload: []
                    })
                }
            })
    }
}