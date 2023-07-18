import { takeLatest, put, call } from 'redux-saga/effects';
import { loginSuccess, loginFailure } from './authSlice';
import instance from './../../api/axios';

function* login(action) {
    try {
        const data = action.payload;
        const user = yield call(instance.post, "users/login", data);
        const token = user.data.data.token;

        localStorage.setItem("token", token);
        const userData = user.data.data.user;
        const jsonData = JSON.stringify(userData)
        yield put(loginSuccess(jsonData));

    } catch (error) {
        yield put(loginFailure(error.message));
    }
}

function* authSaga() {
    yield takeLatest('auth/login', login);
}

export default authSaga;
