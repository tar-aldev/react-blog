import { put, takeEvery, all, call } from "redux-saga/effects";
import apiService from "services/api.service";
import {
  SIGN_IN_WITH_CREDENTIALS_ASYNC,
  SIGN_IN_WITH_GOOGLE_ASYNC,
  SIGN_UP_ASYNC,
  authSuccess,
  authError,
} from "store/actions/auth";
import { putItemSingle } from "utilities/localStorage";
import jwtDecode from "jwt-decode";

/* Parses token and puts it to localstorage */
export function* autoLogin({ payload: token }) {
  try {
    const decodedToken = jwtDecode(token);
    const currentUserId = decodedToken._id;
    yield call(putItemSingle, "token", token);
    yield put(authSuccess({ token, currentUserId }));
  } catch (error) {
    console.log("error", error);
  }
}

export function* watchAutoLogin() {
  yield takeEvery("AUTO_LOGIN", autoLogin);
}

function* signUpAsync({ payload: { credentials, redirect } }) {
  try {
    const { data } = yield call(apiService.post, "users", credentials);
    yield put({ type: "AUTO_LOGIN", payload: data.token });
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
    yield put({ type: "AUTO_LOGIN", payload: data.token });
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
    yield put({ type: "AUTO_LOGIN", payload: data.token });
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
  yield all([
    watchSignInAsync(),
    watchSignInAsyncGoogle(),
    watchSignUpAsync(),
    watchAutoLogin(),
  ]);
}
