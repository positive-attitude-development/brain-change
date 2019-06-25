let newValuesState = {
    round1: [],
    
}


const newValuesReducer = (state = newValuesState, action) => {
    switch(action.type) {
        case 'SET_NEW_VALUES':
            console.log('In new reducer', action.payload)
            return {
                ...state,
                [action.name]: action.payload
            }
        default: 
            return state;
    }
}

export default newValuesReducer;