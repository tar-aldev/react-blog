import { put, takeEvery, all, call } from "redux-saga/effects";
import apiService from "services/api.service";
import {
  GET_POSTS_ASYNC,
  getPostsSuccess,
  GET_POST_ASYNC,
  getPostSuccess,
} from "store/actions/posts";

const service = apiService();

function* getPostsAsync() {
  try {
    const { data } = yield call(service.get, "posts");
    yield put(getPostsSuccess(data));
  } catch (error) {}
}

function* watchGetPostsAsync() {
  yield takeEvery(GET_POSTS_ASYNC, getPostsAsync);
}

function* getPostAsync({ payload }) {
  try {
    const { data } = yield call(service.get, `posts/${payload}`);
    yield put(getPostSuccess(data));
  } catch (error) {}
}

function* watchGetPostAsync() {
  yield takeEvery(GET_POST_ASYNC, getPostAsync);
}

export default function* postsSaga() {
  yield all([watchGetPostsAsync(), watchGetPostAsync()]);
}
