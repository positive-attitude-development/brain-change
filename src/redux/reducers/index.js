import {combineReducers} from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import admin from './adminReducer';
import valuesReducer from './valuesReducer';
import searchTermReducer from './searchTermReducer';
import profile from './profileReducer';
import editProfile from './editProfileReducer';
import participant from './participantReducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  admin, // will have an id and username if someone is logged in
  valuesReducer,
  searchTermReducer,
  profile,
  editProfile,
  participant,
});

export default rootReducer;
