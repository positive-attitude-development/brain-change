import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* fetchCategories() {
    try{
        let response = yield axios.get('/api/values/category');
        yield put({type: 'SET_CATEGORIES', payload: response.data });
    }catch(error) {
        console.log('Error in fetchCategories:', error)
    }
}

function* fetchPopulation(){
    try{
        let response = yield axios.get('/api/values/population');
        yield put({type: 'SET_POPULATION', payload: response.data });
    }catch(error){
        console.log('Error in fetchPopulation:', error)
    }
}

function* fetchSystem(){
    try{
        let response = yield axios.get('/api/values/system');
        yield put({type: 'SET_SYSTEM', payload: response.data });
    }catch(error){
        console.log('Error in fetchSystem:', error)
    }
}

function* categorySaga() {
    yield takeLatest('FETCH_CATEGORY', fetchCategories);
    yield takeLatest('FETCH_SYSTEM', fetchSystem);
	yield takeLatest('FETCH_POPULATION', fetchPopulation);
}

export default (categorySaga);