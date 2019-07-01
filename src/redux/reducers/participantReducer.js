const participantReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_PARTICIPANTS':
            return action.payload;
        default:
            return state;
    }
};

export default participantReducer;