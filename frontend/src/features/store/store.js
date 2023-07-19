import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import { createLogger } from "redux-logger";
import rootSaga from './rootsaga';
import authSlice from "../auth/authSlice";
import getHomebyIdSlice from "../gethomebyid/getHomebyIdSlice";
import homePageDataSLice from "../HomePageData/homePageDataSLice";
import getBookingsByIdSlice from "../bookings/bookingsSlice"

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const middleware = (getDefalutMiddleware) => getDefalutMiddleware().concat(logger, sagaMiddleware)


const store = configureStore({
    reducer: {
        auth: authSlice,
        getHomeById: getHomebyIdSlice,
        homeData: homePageDataSLice,
        bookingData: getBookingsByIdSlice
    },
    middleware: middleware
});

sagaMiddleware.run(rootSaga);
export default store;
