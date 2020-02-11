const jobReducer = (state = [], { type, payload }) => {
    switch (type) {
        case "UPDATE_JOBS":
            return payload;
        case "UPDATE_JOB":
            console.log(state)
            return payload;
        default:
            return [];
    }
}

export default jobReducer;