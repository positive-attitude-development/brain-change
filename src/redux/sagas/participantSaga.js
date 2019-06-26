import axios from 'axios';
import {put, takeLatest } from 'redux-saga/effects';

function* addOffender(action){
    try{
        console.log('addOffender action.payload:', action.payload)
        let response = yield axios.post('/api/participant/offender', action.payload)
        console.log('addParticipant returns:', response.data)
        action.history.push(`/individualparticipant/${response.data}`);
    }catch(error){
        console.log('Error in addOffender:', error)
    }
}

function* addParticipant(action){
    try{
        console.log('addParticipant action.payload:', action.payload)
        let response = yield axios.post('/api/participant', action.payload)
        console.log('addParticipant returns:', response.data)
        action.history.push(`/individualparticipant/${response.data}`);
    }catch(error){
        console.log('Error in addParticipant:', error)
    }
}

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
        yield put({type: 'SET_INDIVIDUAL', payload: response.data});
    }catch(error){
        console.log('Error in fetchIndividual:', error)
    }
}

function* participantSaga() {
    yield takeLatest('FETCH_PARTICIPANTS', fetchParticipants);
    yield takeLatest('FETCH_INDIVIDUAL', fetchIndividual);
    yield takeLatest('ADD_PARTICIPANT', addParticipant);
    yield takeLatest('ADD_OFFENDER', addOffender);
}

export default (participantSaga);