import { takeLatest, call, put } from 'redux-saga/effects';
import instance from '../../api/axios';
import { homePageFailure, homePageSuccess } from './homePageDataSLice';


function* fetchHomeData() {
    try {

        const response = yield call(instance.get, `/home/getAll`)

        yield put(homePageSuccess(response.data));

    } catch (error) {

        yield put(homePageFailure(error.message));
    }
}

export default function* homeDataSaga() {
    yield takeLatest("homepage/homePageStart", fetchHomeData);
}