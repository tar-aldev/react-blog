import { put, takeEvery, all, call } from "redux-saga/effects";
import apiService from "services/api.service";
import {
  SIGN_IN_WITH_CREDENTIALS_ASYNC,
  SIGN_IN_WITH_GOOGLE_ASYNC,
  SIGN_UP_ASYNC,
  authSuccess,
  authError,
} from "store/actions/auth";

function* signUpAsync({ payload: { credentials, redirect } }) {
  console.log("sign up saga", credentials, redirect);
  try {
    const { data } = yield call(apiService.post, "users", credentials);
    yield put(authSuccess(data));
    yield redirect("/posts");
  } catch (error) {
    console.log("ERRR", error);
    yield put(authError(error.response.data.message));
  }
}

function* watchSignUpAsync() {
  yield takeEvery(SIGN_UP_ASYNC, signUpAsync);
}

function* signInAsync({ payload: { credentials, redirect } }) {
  try {
    const { data } = yield call(apiService.post, "auth/signin", credentials);
    yield put(authSuccess(data));
    yield redirect("/posts");
  } catch (error) {
    console.log("ERRR", error);
    yield put(authError(error.response.data.message));
  }
}

function* watchSignInAsync() {
  yield takeEvery(SIGN_IN_WITH_CREDENTIALS_ASYNC, signInAsync);
}

function* signInAsyncGoogle({ payload: { code, redirect } }) {
  try {
    const { data } = yield call(apiService.post, "auth/signin-google", code);
    yield put(authSuccess(data));
    yield redirect("/posts");
  } catch (error) {
    yield redirect("/login");
    yield put(authError(error.response.data.message));
  }
}

function* watchSignInAsyncGoogle() {
  yield takeEvery(SIGN_IN_WITH_GOOGLE_ASYNC, signInAsyncGoogle);
}

export default function* authSagas() {
  yield all([watchSignInAsync(), watchSignInAsyncGoogle(), watchSignUpAsync()]);
}
