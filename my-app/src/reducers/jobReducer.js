const jobReducer = (state = [], { type, payload }) => {
    switch (type) {
        // DEP
        case "ADD_JOB":
            // Add the job in the state array
            console.log(payload)
            let _state = state.slice();
            _state.splice(0, 0, payload)
            return _state
        case "REMOVE_JOB":
            return state.filter(i => i._id !== payload.idToRemove);
        case "UPDATE_JOBS":
            return payload;
        case "UPDATE_JOB":
            // update array with new job
            console.log(payload)
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