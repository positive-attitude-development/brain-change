let newValuesState = {

}


const newValuesReducer = (state = newValuesState, action) => {
    switch(action.type) {
        case 'SET_NEW_VALUES':
            return {
                ...state,
                [action.name]: action.payload
            }
        default: 
            return state;
    }
}