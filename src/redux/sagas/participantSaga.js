import axios from 'axios';
import {put, takeLatest } from 'redux-saga/effects';

function* fetchParticipants() {
    try{
        let response = yield axios.get('/api/participant');
        yield put({type: 'SET_PARTICIPANTS', payload: response.data});
    }catch(error) {
        console.log('Error in fetchParticipants:', error)
    }
}

function* fetchIndividual(action){
    try{
        const response = yield axios.get(`/api/participant/individual/${action.payload}`);
        console.log('individual participant response.data:', response.data)
    }catch(error){
        console.log('Error in fetchIndividual:', error)
    }
}

function* participantSaga() {
    yield takeLatest('FETCH_PARTICIPANTS', fetchParticipants);
    yield takeLatest('FETCH_INDIVIDUAL', fetchIndividual);
}

export default (participantSaga);