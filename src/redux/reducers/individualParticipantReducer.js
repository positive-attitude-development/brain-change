const individualParticipantReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_INDIVIDUAL':
            return action.payload;
        default:
            return state;
    }
};

export default individualParticipantReducer;