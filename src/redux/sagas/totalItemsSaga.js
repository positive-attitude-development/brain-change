import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchTotalItems() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get('api/shelf/count', config);

        yield put({ type: 'SET_ITEMS', payload: response.data });
    } catch (error) {
        console.log('Get Request Failed (fetchTotalItems)', error);
    }
}

function* totalItemsSaga() {
    yield takeLatest('FETCH_ITEMS', fetchTotalItems);
}

export default totalItemsSaga;