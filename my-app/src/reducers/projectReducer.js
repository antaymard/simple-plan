import axios from "axios";

const projectReducer = (state = [], action) => {
    switch (action.type) {
        case "UPDATE_PROJECTS":
            return action.payload;
        default:
            return state;
    }
}

export default projectReducer;