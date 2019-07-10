import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerAdmin(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
 
    yield axios.post('api/admin/register', action.payload);

    // automatically log an admin in after registration
    yield put({type: 'LOGIN', payload: action.payload, history: action.history});
    
    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({type: 'SET_TO_LOGIN_MODE'});
  } catch (error) {
      console.log('Error with admin registration:', error);
      yield put({type: 'REGISTRATION_FAILED'});
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerAdmin);
}

export default registrationSaga;
