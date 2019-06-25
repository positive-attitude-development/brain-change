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

function* categorySaga() {
    yield takeLatest('FETCH_CATEGORY', fetchCategories);
}

export default (categorySaga);