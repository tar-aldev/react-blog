import { put, takeEvery, all, call } from "redux-saga/effects";
import {
  GET_CURRENT_USER_ASYNC,
  getCurrentUserSuccess,
  UPDATE_USER_PROFILE_ASYNC,
  updateUserProfileSuccess,
} from "store/actions/user";
import apiService from "services/api.service";
import { updatePostSuccess } from "store/actions/posts";
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

export function* updateProfileAsync({ payload }) {
  try {
    const { data } = yield call(apiService.patch, "users/profile", payload);
    yield put(updateUserProfileSuccess(data.profile));
  } catch (error) {
    // yield put(authError(error.response.data.message));
  }
}

export function* watchUpdateProfileAsync() {
  yield takeEvery(UPDATE_USER_PROFILE_ASYNC, updateProfileAsync);
}

export default function* authSagas() {
  yield all([watchGetCurrentUserAsync(), watchUpdateProfileAsync()]);
}
