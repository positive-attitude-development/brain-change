const snapshotReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_SNAPSHOT':
            console.log(action.payload)
            return action.payload; 
        default:
            return state;
    }
};

export default snapshotReducer;