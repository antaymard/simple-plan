import axios from "axios";

const projectReducer = (state = [], { type, payload }) => {
    switch (type) {
        case "UPDATE_PROJECTS":
            return payload;
        default:
            return state;
    }
}

export default projectReducer;