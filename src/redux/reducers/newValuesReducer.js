let newValuesState = {
    round1: [],
    round2: [],
    round3: [],
    round4: [],
    round5: [],
    belief1: []
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