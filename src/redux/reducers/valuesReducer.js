const valuesReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_VALUES':
            console.log('Inside valuesReducer', action.payload)
            return action.payload;
        default:
            return state;
    }
};

export default valuesReducer;