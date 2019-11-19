import { put, takeEvery, all, call } from "redux-saga/effects";
import apiService from "services/api.service";
import {
  GET_POSTS_ASYNC,
  getPostsSuccess,
  GET_POST_ASYNC,
  getPostSuccess,
  ADD_POST_ASYNC,
  addPostSuccess,
  GET_TAGS_ASYNC,
  getTagsSuccess,
} from "store/actions/posts";
import { getValueFromJson } from "utilities/richEditor";

function* getPostsAsync() {
  try {
    const { data } = yield call(apiService.getData, "posts");
    yield put(getPostsSuccess(data));
  } catch (error) {}
}

function* watchGetPostsAsync() {
  yield takeEvery(GET_POSTS_ASYNC, getPostsAsync);
}

function* getPostAsync({ payload }) {
  try {
    const { data } = yield call(apiService.getData, `posts/${payload}`);

    yield put(
      getPostSuccess({
        ...data.post,
        slateValue: getValueFromJson(data.post.encodedBody),
      })
    );
  } catch (error) {
    console.error("get post async", error);
  }
}

function* watchGetPostAsync() {
  yield takeEvery(GET_POST_ASYNC, getPostAsync);
}

function* addPostAsync({ payload }) {
  console.log("add POST", payload);
  try {
    const { data } = yield call(apiService.post, `posts`, payload);
    yield put(addPostSuccess(data));
  } catch (error) {}
}

function* watchAddPostAsync() {
  yield takeEvery(ADD_POST_ASYNC, addPostAsync);
}

function* getTagsAsync() {
  try {
    const { data } = yield call(apiService.getData, `tags`);

    yield put(getTagsSuccess(data.tags));
  } catch (error) {
    console.error("get post async", error);
  }
}

function* watchGetTagsAsync() {
  yield takeEvery(GET_TAGS_ASYNC, getTagsAsync);
}

export default function* postsSaga() {
  yield all([
    watchGetPostsAsync(),
    watchGetPostAsync(),
    watchAddPostAsync(),
    watchGetTagsAsync(),
  ]);
}
