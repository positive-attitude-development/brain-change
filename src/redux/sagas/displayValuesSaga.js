import axios from 'axios';
import { put, takeLatest, select } from 'redux-saga/effects';
import {getValues} from './selectors';

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
        yield put({type: 'SET_NEW_TIME', name: 'percentTime', payload: action.payload.percentTime})
        const newValues = yield select(getValues);
        yield axios.post('/api/snapshot/result', newValues);
    }catch(error) {
        console.log('Error in addResults', error)
    }
}

function* displayValuesSaga() {
    yield takeLatest('FETCH_VALUES', fetchValues);
    yield takeLatest('ADD_RESULTS', addResults);
}

export default (displayValuesSaga);

