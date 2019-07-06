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
        console.log('addResults action.payload', action.payload)
        yield put({type: 'SET_NEW_TIME', name: 'percentTime', payload: action.payload.percentTime})
        yield put({type: 'SET_NEW_VALUES', name: 'percents', payload: action.payload.percents})
        const newValues = yield select(getValues);
        yield axios.post('/api/snapshot/result', newValues);
        const snapshot = yield axios.get(`/api/participant/snapshot/${newValues.participantId}`);
        yield put({type: 'SET_SNAPSHOT', payload: snapshot.data});
    }catch(error) {
        console.log('Error in addResults', error);
    }
}

function* displayValuesSaga() {
    yield takeLatest('FETCH_VALUES', fetchValues);
    yield takeLatest('ADD_RESULTS', addResults);
}

export default (displayValuesSaga);

