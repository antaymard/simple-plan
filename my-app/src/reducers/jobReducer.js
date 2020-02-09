const jobReducer = (state = [], action) => {
    switch (action.type) {
        case "UPDATE_JOBS":
            return action.payload;
        case "UPDATE_JOB":
            let nState = state;
            // update the object in the array
            // nState.map((e) => {
            //     if (e._id === action.payload._id) {
            //         console.log(e);
            //         console.log(action.payload)
            //         e = action.payload;
            //     }
            // })
            console.log(state)
            return state;
        default:
            return state;
    }
}

export default jobReducer;