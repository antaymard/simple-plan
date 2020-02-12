const projectReducer = (state = [], { type, payload }) => {
    switch (type) {
        case "UPDATE_PROJECTS":
            return payload;
        case "UPDATE_PROJECT":
            return state.map(item => {
                if (item._id === payload._id) {
                    return payload;
                } else {
                    return item;
                }
            })
        default:
            return state;
    }
}

export default projectReducer;