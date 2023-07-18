import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import { createLogger } from "redux-logger";
import rootSaga from './rootsaga';
import authSlice from "../auth/authSlice";

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const middleware =  (getDefalutMiddleware) => getDefalutMiddleware().concat(logger,sagaMiddleware)


const store = configureStore({
    reducer: {
        auth: authSlice
    },
    middleware: middleware
});

sagaMiddleware.run(rootSaga);
export default store;
