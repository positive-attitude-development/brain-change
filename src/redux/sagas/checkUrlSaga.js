import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* retrieveUrl(action) {
    try {
        let response = yield axios.get(`/api/url/retrieve&id=${action.payload}`);
        yield put({type: 'SET_URL', payload: response.data});
    } catch (error) {
        console.log('Error in fetchUrl:', error);
    }
}

function* verifyUrl(action) {
    try {
        let response = yield axios.get(`/api/url/verify?token=${action.payload}`);
        let expireDate = new Date(response.data.expiration_date);
        let today = new Date();
        if ( expireDate >= today ) {
            yield put({type: 'SET_URL', payload: response.data});
        }
    } catch(error) {
        console.log('Error in checkUrl', error);
    }
}

function* checkUrlSaga() {
    yield takeLatest('FETCH_URL', retrieveUrl);
    yield takeLatest('VERIFY_URL', verifyUrl);
}

export default (checkUrlSaga);

