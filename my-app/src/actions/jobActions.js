import axios from "axios";
import queryString from 'query-string';
import { ObjectId } from 'bson';

// merge les deux avec action local TODO

// UPDATE THE ARRAY LIST OF JOBS
export const getJobs = (options) => {
    return (dispatch) => {
        // Local action HERE dispatched
        console.log("UPDATE JOBS ACTION FIRED - options are : ")
        console.log(options)
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


// UPDATE ONE SPECIFIC JOB
export const updateJob = (newData) => {
    return (dispatch, getState) => {
        console.log("UPDATE JOB ACTION FIRED - data is : ")
        // const { jobs } = getState();
        console.log(newData)
        // Local here
        axios.put('/api/job',
            newData,
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
                        payload: newData
                    })
                }
            })
    }
}

export const newJob = (newJobData) => {
    return (dispatch) => {
        axios.post('/api/job',
            newJobData,
            {
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }
            })
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: "UPDATE_JOB",
                    payload: newJobData
                })
            })
    }
}

export const addBlankJob = (tempData) => {
    return (dispatch) => {
        console.log(tempData);
        // create id
        let id = new ObjectId();
        tempData._id = id.toHexString();
        tempData = {
            createdOn: "2020-01-02T14:48:10.935Z",
            name: "OMG",
            description: "",
            projectId: {
                _id: 2
            },
            progress: 0,
            type: "build",
            resLink: [],
            weekNumber: [],
            deadline: "2020-02-20T23:00:00.000Z",
            status: "active",
            isInProgress: true,
            isNow: false
        }
        // push in the array
        console.log(tempData)
        dispatch({
            type: "ADD_JOB",
            payload: tempData,
        })
    }
}