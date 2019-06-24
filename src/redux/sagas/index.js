import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import adminSaga from './adminSaga';
import postItem from './itemSaga';
import viewShelfSaga from './viewShelfSaga';
import totalItemsSaga from './totalItemsSaga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    adminSaga(),
    postItem(),
    viewShelfSaga(),
    totalItemsSaga()
  ]);
}
