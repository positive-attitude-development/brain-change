const participantEdits = {
	first_name: '',
	last_name: '',
	age: '',
	gender: '',
	category_id: '',
	state: '',
	email_address: '',
	phone_number: '',
	url: '',
	system_id: 0,
	offender_system_id: 0,
	felon: '',
	violent_offender: '',
	population_id: 0
};

const editParticipantReducer = (state = participantEdits, action) => {
    switch(action.type) {
        case 'SET_EDIT_PARTICIPANT':
            return action.payload;
		case 'EDIT_PARTICIPANT':
            return {...state, [action.payload.property]: action.payload.value};
		case 'CANCEL_EDIT_PARTICIPANT':
            return state;
        default:
            return state;
    }
};

export default editParticipantReducer;