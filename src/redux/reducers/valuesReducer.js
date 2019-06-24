const valuesReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_VALUES':
            return action.payload;
        default:
            return state;
    }
};

export default valuesReducer;