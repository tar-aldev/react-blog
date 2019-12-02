import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import authSagas from "store/sagas/auth";
import postsSagas from "store/sagas/posts";
import commentsSagas from "store/sagas/comments";
import userSagas from "store/sagas/user";
import { all } from "redux-saga/effects";
import authReducer from "store/reducers/auth";
import postsReducer from "store/reducers/posts";
import commentsReducer from "store/reducers/comments";
import userReducer from "store/reducers/user";
import {
  saveTokenLocalStorage,
  saveItemLocalStorage,
} from "utilities/localStorage";
import { AUTH_ERROR } from "./actions/auth";

import axiosService from "services/api.service";

const sagaMiddleware = createSagaMiddleware();

const combinedReducers = combineReducers({
  authReducer,
  postsReducer,
  commentsReducer,
  userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combinedReducers,
  composeEnhancers(applyMiddleware(/* logger,  */ sagaMiddleware))
);

function* rootSaga() {
  yield all([authSagas(), userSagas(), postsSagas(), commentsSagas()]);
}

sagaMiddleware.run(rootSaga);

export default store;
