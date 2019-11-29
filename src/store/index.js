import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import authSagas from "store/sagas/auth";
import postsSagas from "store/sagas/posts";
import commentsSagas from "store/sagas/comments";
import { all } from "redux-saga/effects";
import authReducer from "store/reducers/auth";
import postsReducer from "store/reducers/posts";
import commentsReducer from "store/reducers/comments";
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
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* const logger = store => next => action => {
  if (action.type === AUTH_ERROR) {
    const tryRefreshToken = async () => {
      const refreshedToken = await axiosService.post("auth/refresh-token");
      console.log("AUTH ERROR", refreshedToken);
    };
    console.log("AUTH ERROR", action.payload);
    tryRefreshToken();
  }
}; */

const store = createStore(
  combinedReducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

/* store.subscribe(() => {
  const { accessToken, refreshToken } = store.getState().authReducer;

  saveItemLocalStorage("accessToken", accessToken);
  saveItemLocalStorage("refreshToken", refreshToken);
}); */

function* rootSaga() {
  yield all([authSagas(), postsSagas(), commentsSagas()]);
}

sagaMiddleware.run(rootSaga);

export default store;
