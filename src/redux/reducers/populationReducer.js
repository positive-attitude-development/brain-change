const populationReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_POPULATION':
            return action.payload;
        default:
            return state;
    }
};

export default populationReducer;