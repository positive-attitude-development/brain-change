import axios from "axios";
import {put, takeEvery} from 'redux-saga/effects'


function* postItem(action) {
    try {
        yield axios.post('/api/shelf', action.payload)
        yield put({type: `FETCH_SHELF`})
    } catch (error) {
        console.log(`error in postItem generator function:`, error);
        
    }
}


function* postSaga() {
    yield takeEvery(`POST_ITEM`, postItem)
}

export default postSaga;