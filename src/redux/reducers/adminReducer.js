const adminReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ADMIN':
      return action.payload;
    case 'UNSET_ADMIN':
      return {};
    default:
      return state;
  }
};



// admin will be on the redux state at: state.admin
export default adminReducer;
