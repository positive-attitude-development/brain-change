const profileEdits = {}

const editProfileReducer = (state = profileEdits, action) => {
    switch(action.type) {
        case 'SET_EDIT_PROFILE':
            return {state: action.payload}
		case 'EDIT_PROFILE':
            return action.payload;
		case 'CANCEL_EDIT':
            return {state: {}};
        default:
            return state;
    }
};

export default editProfileReducer;