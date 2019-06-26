import {combineReducers} from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import admin from './adminReducer';
import valuesReducer from './valuesReducer';
import newValuesReducer from './newValuesReducer';
import searchTermReducer from './searchTermReducer';
import profile from './profileReducer';
import editProfile from './editProfileReducer';

import allRecordsReducer from './allRecordsReducer';

import adminContactReducer from './adminContactReducer'; 


import participant from './participantReducer';
import individual from './individualParticipantReducer';
import category from './categoriesReducer';


const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  admin, // will have an id and username if someone is logged in
  valuesReducer,
  newValuesReducer,
  searchTermReducer,
  profile,
  editProfile,
  allRecordsReducer,
  adminContactReducer,

  participant, //this is all participants for MyParticipants view
  individual, //this is a single participant for the IndividualParticipant view
  category,

});

export default rootReducer;
