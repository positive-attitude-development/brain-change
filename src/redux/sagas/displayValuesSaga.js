import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchValues() {
    try{
        let response = yield axios.get('/api/values');
        yield put({ type: 'SET_VALUES', payload: response.data });
    }catch(error) {
        console.log('Error in fetchValues:', error)
    }
}

function* displayValuesSaga() {
    yield takeLatest('FETCH_VALUES', fetchValues);
}

export default (displayValuesSaga);

