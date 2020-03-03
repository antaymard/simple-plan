const projectReducer = (state = [], { type, payload }) => {
    switch (type) {
        case "UPDATE_PROJECTS":
            return payload;
        case "UPDATE_PROJECT":
            let _index = state.filter(i => i._id === payload._id).length;
            console.log(_index)
            // If updated object is in the state, update the array
            if (_index > 0) {
                return state.map(item => {
                    if (item._id === payload._id) {
                        return payload;
                    } else {
                        return item;
                    }
                })
            }
            // If not in the array, add it into it (ie it's a new one)
            else if (_index === 0) {
                console.log("not in the array");
                let _state = state.slice();
                _state.splice(0, 0, payload);
                return _state;
            }
        case "REMOVE_PROJECT":
            return state.filter(i => i._id !== payload.idToRemove);
        default:
            return state;
    }
}

export default projectReducer;