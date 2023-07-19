import { all } from 'redux-saga/effects';
import authSaga from '../auth/authSaga';
import getHomeSaga from '../gethomebyid/getHomebyIdSaga';




function* rootSaga() {
  yield all([
    authSaga(),
    getHomeSaga(),
  ]);
}

export default rootSaga;
