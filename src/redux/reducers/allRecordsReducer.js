const allRecordsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_RECORDS':
            return action.payload;
        default:
            return state;
    }
};

export default allRecordsReducer;