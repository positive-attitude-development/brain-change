const profileEdits = {
    username: '',
	first_name: '',
	last_name: '',
	organization: '',
	title: '',
	phone_number: '',
	email_address: '',
	street_address: '',
	street_address2: '',
	city: '',
	state: '',
	zipcode: 0
}

const editProfileReducer = (state = profileEdits, action) => {
    switch(action.type) {
        case 'SET_EDIT_PROFILE':
            return {state: action.payload}
		case 'EDIT_PROFILE':
            console.log('edit_profile reducer action.payload:', action.payload.value)
            return {...state.state, [action.payload.property]: action.payload.value};
		case 'CANCEL_EDIT':
            return {state: {}};
        default:
            return state;
    }
};

export default editProfileReducer;