const resultDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_RESULT_DATA':
            return action.payload;
        default:
            return state;
    }
};

export default resultDataReducer;