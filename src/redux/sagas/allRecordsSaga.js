import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* fetchAllRecords() {
    try {
        let response = yield axios.get('/api/participant/all');
        yield put({type: 'SET_ALL_RECORDS', payload: response.data});
    } catch (error) {
        // console.log('Error in fetchAllRecords:', error)
    }
}

function* downloadResultData() {
    try {
        let response = yield axios.get('/api/snapshot/all');
        yield put({type: 'SET_RESULT_DATA', payload: response.data});
    } catch (error) {
        // console.log('Error in downloadResultData:', error)
    }
}

function* allRecordsSaga() {
    yield takeLatest('FETCH_ALL_RECORDS', fetchAllRecords);
    yield takeLatest('DOWNLOAD_RESULT_DATA', downloadResultData);
}

export default allRecordsSaga;

