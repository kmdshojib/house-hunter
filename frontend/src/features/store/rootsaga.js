import { all } from 'redux-saga/effects';
import authSaga from '../auth/authSaga';
// import dataUser from '../gethomebyid/getHomebyIdsaga';



function* rootSaga() {
  yield all([
    authSaga(),
  ]);
}

export default rootSaga;
