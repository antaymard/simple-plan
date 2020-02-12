const jobReducer = (state = [], { type, payload }) => {
    switch (type) {
        case "UPDATE_JOBS":
            return payload;
        case "UPDATE_JOB":
            // update array with new job
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

export default jobReducer;