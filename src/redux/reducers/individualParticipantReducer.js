const individualParticipantReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_INDIVIDUAL':
            console.log('individualReducer:', action.payload)
            return action.payload;
        default:
            return state;
    }
};

export default individualParticipantReducer;