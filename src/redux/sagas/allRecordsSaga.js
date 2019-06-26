import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* fetchAllRecords() {
    try {
        let response = yield axios.get('/api/participants/all');
        yield put({type: 'SET_ALL_RECORDS', payload: response.data});
    } catch (error) {
        console.log('Error in fetchAllRecords:', error)
    }
}

function* allRecordsSaga() {
    yield takeLatest('FETCH_ALL_RECORDS', fetchAllRecords);
}

export default allRecordsSaga;

