import { takeLatest, call, put, all } from 'redux-saga/effects';
import { getHomeByIdFailure, getHomeByIdStart, getHomeByIdSuccess } from './getHomebyIdSlice';
import instance from '../../api/axios';

function* fetchHomeById(action) {
  try {
    yield put(getHomeByIdStart());
    const id = action.payload;
    const response = yield call(instance.get, `/home/gethomebyid/${id}`);
    const data = response.data; // assuming the response contains the data you need

    yield put(getHomeByIdSuccess(data));
  } catch (error) {
    yield put(getHomeByIdFailure(error.message));
  }
}

function* watchFetchHomeById() {
  yield takeLatest(getHomeByIdStart.type, fetchHomeById);
}

function* getHomeByIdSaga() {
  yield all([watchFetchHomeById()]);
}

export default getHomeByIdSaga;
