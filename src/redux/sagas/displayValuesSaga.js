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

function* addResults(action) {
    try{
        console.log('addResults action.payload', action.payload);
        yield axios.post('/api/snapshot/result', action.payload);
    }catch(error) {
        console.log('Error in addResults', error)
    }
}

function* displayValuesSaga() {
    yield takeLatest('FETCH_VALUES', fetchValues);
    yield takeLatest('ADD_RESULTS', addResults);
}

export default (displayValuesSaga);

