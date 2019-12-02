import { put, takeEvery, all, call } from "redux-saga/effects";
import {
  GET_CURRENT_USER_ASYNC,
  getCurrentUserSuccess,
} from "store/actions/user";
import apiService from "services/api.service";

export function* getCurrentUserAsync() {
  try {
    const { data } = yield call(apiService.getData, "users/me");
    yield put(getCurrentUserSuccess(data.me));
  } catch (error) {
    // yield put(authError(error.response.data.message));
  }
}

export function* watchGetCurrentUserAsync() {
  yield takeEvery(GET_CURRENT_USER_ASYNC, getCurrentUserAsync);
}

export default function* authSagas() {
  yield all([watchGetCurrentUserAsync()]);
}
