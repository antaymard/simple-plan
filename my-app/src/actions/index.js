import axios from "axios"

export const getProjects = (payload) => {
    return {
        type: "GET_PROJECTS",
        payload: payload
    }
}