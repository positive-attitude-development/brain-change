const categoriesReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_CATEGORIES':
            console.log('Categories reducer:', action.payload)
            return action.payload;
        default:
            return state;
    }
};

export default categoriesReducer;