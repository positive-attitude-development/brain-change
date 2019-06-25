import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_ADMIN" actions
function* fetchAdmin() {
  try {
    const config = {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
    };

    // the config includes credentials which allow the server session to recognize the admin
    // If an admin is logged in, this will return their information from the server session (req.user)
    const response = yield axios.get('api/admin', config);

    // now that the session has given us a user object with an id and username set the client-side user object to let
    // the client-side code know the admin is logged in
    yield put({type: 'SET_ADMIN', payload: response.data});
  } catch (error) {
    console.log('Admin get request failed', error);
  }
}

function* fetchProfile(action){
  try{
    console.log('admin id:', action.payload)
    const response = yield axios.get('api/admin/profile')
    console.log('adminSage fetchProfile response.data:', response.data)
    yield put({type: 'SET_PROFILE', payload: response.data})
    //and send this info to the editProfileReducer so it's stored there if admin edits profile info
    yield put({type: 'EDIT_PROFILE', payload: response.data})
  }catch(error){
    console.log('Profile get request failed', error)
  }
}

function* adminSaga() {
  yield takeLatest('FETCH_ADMIN', fetchAdmin);
  yield takeLatest('FETCH_PROFILE', fetchProfile);
}

export default adminSaga;
