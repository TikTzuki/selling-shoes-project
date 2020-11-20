import { applyMiddleware, configureStore, createStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    {},
    applyMiddleware(sagaMiddleware)
    );

//sagaMiddleware.run(rootSaga);
export default store;