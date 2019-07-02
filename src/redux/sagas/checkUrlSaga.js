import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* newUrl(action){
    try{
        let urlid = action.payload.urlId
        yield axios.put(`/api/url/${urlid}`, action.payload)
        yield put({type: 'FETCH_INDIVIDUAL', payload: action.payload.id})
    }catch(error){
        console.log('error in newUrl:', error)
    }
}

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
    yield takeLatest('NEW_URL', newUrl);
}

export default (checkUrlSaga);

