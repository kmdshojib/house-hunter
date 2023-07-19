import { takeLatest, call, put } from 'redux-saga/effects';
import { getHomeByIdFailure, getHomeByIdSuccess } from './getHomebyIdSlice';
import instance from '../../api/axios';

function* getDataByIdSaga(action) {
  try {

    const id = action.payload;

    const token = localStorage.getItem('token');

    console.log({ id, token });
    const response = yield call(instance.get, `/home/gethomebyid/${id}`)

    yield put(getHomeByIdSuccess(response.data));

  } catch (error) {

    yield put(getHomeByIdFailure(error.message));
  }
}

export default function* getHomeSaga() {
  yield takeLatest("homeById/getHomeByIdStart", getDataByIdSaga);
}