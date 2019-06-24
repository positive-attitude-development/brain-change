import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import admin from './adminReducer';
import viewShelfReducer from './viewShelfReducer';
import totalItemsReducer from './totalItemsReducer';
import valuesReducer from './valuesReducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  admin, // will have an id and username if someone is logged in
  viewShelfReducer,
  totalItemsReducer,
  valuesReducer,
});

export default rootReducer;
