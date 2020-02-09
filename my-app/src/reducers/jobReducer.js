const jobReducer = (state = [], action) => {
    switch (action.type) {
        case "omg":
            console.log("omg reducer !!");
        default:
            return state;
    }
}

export default jobReducer;