const participantReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_PARTICIPANTS':
            console.log('participantReducer:', action.payload)
            return action.payload;
        default:
            return state;
    }
};

export default participantReducer;