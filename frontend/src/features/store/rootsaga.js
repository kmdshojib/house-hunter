import { all } from 'redux-saga/effects';
import authSaga from '../auth/authSaga';
import getHomeSaga from '../gethomebyid/getHomebyIdSaga';
import homeDataSaga from '../HomePageData/homePageSaga';
import getBookingsSaga from '../bookings/bookingsSaga';



function* rootSaga() {
  yield all([
    authSaga(),
    getHomeSaga(),
    homeDataSaga(),
    getBookingsSaga()
  ]);
}

export default rootSaga;
