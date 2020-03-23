import axios from "axios";
import queryString from 'query-string';
import { toast } from "react-toastify";

let headers = {
    "x-access-token": localStorage.getItem('token')
};

// merge les deux avec action local TODO

// UPDATE THE ARRAY LIST OF JOBS
export const getJobs = (options) => {
    return (dispatch) => {
        // Local action HERE dispatched
        console.log("UPDATE JOBS ACTION FIRED - options are : ")
        console.log(options)
        axios.get('/api/jobs?' + queryString.stringify(options), {
            headers: headers
        })
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: "UPDATE_JOBS",
                    payload: res.data
                })
            })
    }
}


// UPDATE ONE SPECIFIC JOB
export const updateJob = (newData) => {
    return (dispatch, getState) => {
        console.log("UPDATE JOB ACTION FIRED - data is : ")
        // const { jobs } = getState();
        console.log(newData)
        // Local here
        axios.patch('/api/job',
            newData,
            {
                headers: headers,

            })
            .then(res => {
                if (res.data.success) {
                    console.log(res.data.data)
                    toast('Job mis à jour',
                        { type: toast.TYPE.SUCCESS }
                    )
                    console.log(newData)
                    console.log(res.data.data);
                    dispatch({
                        type: "UPDATE_JOB",
                        payload: res.data.data
                    })
                } else if (!res.data.success) {
                    toast('Erreur lors de la mise à jour : ' + JSON.stringify(res.data.error),
                        { type: toast.TYPE.ERROR }
                    )
                }
            })
    }
}

// Create a new job
export const newJob = (newJobData) => {
    console.log("NEW JOB FIRED");
    console.log(newJobData)
    return (dispatch) => {
        axios.post('/api/job',
            newJobData,
            {
                headers: headers
            })
            .then(res => {
                console.log(res.data.data)
                if (res.data.success) {
                    toast('Job créé avec succès',
                        { type: toast.TYPE.SUCCESS }
                    )
                    dispatch({
                        type: "ADD_JOB",
                        payload: res.data.data
                    })
                }
            })
    }
}

export const deleteJob = (jobId) => {
    return (dispatch) => {
        axios.delete('/api/job/' + jobId,
            { headers: headers }
        ).then(res => {
            if (res.data === "ok") {
                toast('Job supprimé',
                    { type: toast.TYPE.SUCCESS }
                )
                dispatch({
                    type: 'UPDATE_JOB',
                    payload: {
                        idToRemove: jobId
                    }
                })
            }
        })
    }
}
