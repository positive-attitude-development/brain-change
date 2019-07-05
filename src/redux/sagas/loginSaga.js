import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGIN" actions
function* loginAdmin(action) {
  try {
    // clear any existing error on the login page
    yield put({type: 'CLEAR_LOGIN_ERROR'});

    const config = {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
    };

    // send the action.payload as the body
    // the config includes credentials which
    // allow the server session to recognize the admin
    const response = yield axios.post('api/admin/login', action.payload, config);
    let accessLevel = response.data.level;
    console.log('login saga action:', action)
    
    console.log('action.payload.level:', action.payload.level );
    console.log('accessLevel:', accessLevel );

    let levelCheck;

    if( accessLevel != undefined ){
      levelCheck = accessLevel;
    }else{
      levelCheck = action.payload.level;
    }
    console.log( 'levelCheck:', levelCheck );
    // after the admin has logged in get the admin information from the server
    yield put({type: 'FETCH_ADMIN'});
    if (levelCheck === 1){
    	yield action.history.push('/info');
    }else if(levelCheck === 2){
      yield action.history.push('/profile');
    }else if(levelCheck === 3){
		  yield action.history.push('/myparticipants');
    }else if(levelCheck >= 4){
		  yield action.history.push('/allparticipants');
    }
  } catch (error) {
    console.log('Error with admin login:', error);
    if (error.response.status === 401) {
      // The 401 is the error status sent from passport
      // if admin isn't in the database or if the username and password don't match in the database
      yield put({type: 'LOGIN_FAILED'});
    } else {
      // Got an error that wasn't a 401
      // Could be anything, but most common cause is the server is not started
      yield put({type: 'LOGIN_FAILED_NO_CODE'});
    }
  }
}

// worker Saga: will be fired on "LOGOUT" actions
function* logoutAdmin(action) {
  try {
    const config = {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true,
    };

    // the config includes credentials which allow the server session to recognize the admin
    // when the server recognizes the user session it will end the session
    yield axios.post('api/admin/logout', config);

    // now that the session has ended on the server remove the client-side 
    // user object to let the client-side code know the admin is logged out
    yield put({type: 'UNSET_ADMIN'});

  } catch (error) {
    console.log('Error with admin logout:', error);
  }
}

function* loginSaga() {
  yield takeLatest('LOGIN', loginAdmin);
  yield takeLatest('LOGOUT', logoutAdmin);
}

export default loginSaga;
