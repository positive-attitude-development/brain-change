
const newValuesState = {
    participantId: '',
    round1: [],
    round2: [],
    round3: [],
    round4: [],
    round5: [],
    beliefs: [],
    testedBelief: [],
    orderCore: [],
    violators:[],
    orderViolators: [],
    percents: [],
    round1Time: [],
    round2Time: [],
    round3Time: [],
    round4Time: [],
    round5Time: [],
    belief1Time: [],
    belief2Time: [],
    orderCoreTime: [],
    pickViolatorTime: [],
    orderViolatorTime: [],
    percentTime: [],
}




const newValuesReducer = (state = newValuesState, action) => {
    switch(action.type) {
        case 'SET_NEW_VALUES':
            console.log('In new value reducer', action.payload)
            return {
                ...state,
                [action.name]: action.payload
            }
        case 'SET_NEW_TIME' :
            return {
                ...state,
                [action.name]: action.payload
            }
        default: 
            return state;
    }
}

export default newValuesReducer;