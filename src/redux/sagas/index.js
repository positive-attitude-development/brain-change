import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import adminSaga from './adminSaga';
import displayValuesSaga from './displayValuesSaga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    adminSaga(),
    displayValuesSaga()
  ]);
}
