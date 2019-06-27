const systemReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_SYSTEM':
            return action.payload;
        default:
            return state;
    }
};

export default systemReducer;