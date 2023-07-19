import { takeLatest, call, put } from 'redux-saga/effects';
import instance from '../../api/axios';
import { getBookingsByFailure, getBookingsBySuccess } from './bookingsSlice';

function* getDataByIdSaga(action) {
    try {

        const id = action.payload;

        const response = yield call(instance.get, `/bookings/bookings/${id}`)

        yield put(getBookingsBySuccess(response.data));

    } catch (error) {

        yield put(getBookingsByFailure(error.message));
    }
}

export default function* getBookingsSaga() {
    yield takeLatest("getBookingsById/getBookingsByStart", getDataByIdSaga);
}