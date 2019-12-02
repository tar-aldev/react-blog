import { put, takeEvery, all, call } from "redux-saga/effects";
import apiService from "services/api.service";
import {
  SIGN_IN_WITH_CREDENTIALS_ASYNC,
  SIGN_IN_WITH_GOOGLE_ASYNC,
  SIGN_UP_ASYNC,
  authSuccess,
  authError,
} from "store/actions/auth";
import { saveItemLocalStorage } from "utilities/localStorage";
import authService from "services/auth.service";
import { decodeToken } from "utilities/auth";

/* Parses token and puts it to localstorage */
export function* decodeAndSaveTokens({
  payload: { accessToken, refreshToken },
}) {
  try {
    const decodedToken = decodeToken(accessToken);
    const currentUserId = decodedToken._id;
    saveItemLocalStorage("accessToken", accessToken);
    saveItemLocalStorage("refreshToken", refreshToken);
    yield put(authSuccess({ currentUserId, accessToken, refreshToken }));
  } catch (error) {
    console.log("error", error);
  }
}

export function* watchDecodeAndSaveTokens() {
  yield takeEvery("DECODE_AND_SAVE_TOKENS", decodeAndSaveTokens);
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
    const {
      data: { accessToken, refreshToken },
    } = yield call(authService.signIn, credentials);
    yield put({
      type: "DECODE_AND_SAVE_TOKENS",
      payload: { accessToken, refreshToken },
    });
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
    watchDecodeAndSaveTokens(),
  ]);
}
