const addParticipant = {
	first_name: '',
}

const addOffenderParticipant = {
	first_name: '',
}

const addParticipantReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_CATEGORIES':
            return action.payload;
        default:
            return state;
    }
};

export default addParticipantReducer;