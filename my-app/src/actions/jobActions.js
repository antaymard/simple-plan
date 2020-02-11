import axios from "axios";
import queryString from 'query-string';

export const getJobs = (options) => {
    return (dispatch) => {
        // Local action HERE dispatched
        // console.log(options)
        axios.get('/api/jobs?' + queryString.stringify(options), {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        })
            .then(res => {
                dispatch({
                    type: "UPDATE_JOBS",
                    payload: res.data
                })
            })
    }
}

// Reçoit 
export const updateJob = (newJobData) => {
    return (dispatch, getState) => {
        const { jobs } = getState();
        console.log(jobs)
        // Local here
        axios.put('/api/job',
            newJobData,
            {
                headers: {
                    "x-access-token": localStorage.getItem('token')
                },

            })
            .then(res => {
                if (res.data === "ok") {
                    console.log(res.data)
                    dispatch({
                        type: "UPDATE_JOB",
                        payload: jobs
                    })
                }
            })
    }
}