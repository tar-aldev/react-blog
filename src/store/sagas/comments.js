import { put, takeEvery, all, call } from "redux-saga/effects";
import apiService from "services/api.service";
import {
  GET_POST_COMMENTS_ASYNC,
  getPostCommentsSuccess,
  ADD_POST_COMMENT_ASYNC,
  addPostCommentSuccess,
} from "store/actions/comments";

function* getPostCommentsAsync({ payload }) {
  try {
    const { data } = yield call(apiService.getData, `comments`, payload);
    console.log("data", data);
    yield put(getPostCommentsSuccess(data.comments));
  } catch (error) {
    console.log("ERR", error);
  }
}

function* watchGetPostCommentsAsync() {
  yield takeEvery(GET_POST_COMMENTS_ASYNC, getPostCommentsAsync);
}

function* addPostCommentAsync({ payload }) {
  const { comment, resetForm } = payload;
  try {
    const { data } = yield call(apiService.post, `comments`, comment);
    resetForm();
    yield put(addPostCommentSuccess(data.comment));
  } catch (error) {
    console.log("ERR", error);
  }
}

function* watchAddPostCommentAsync() {
  yield takeEvery(ADD_POST_COMMENT_ASYNC, addPostCommentAsync);
}

export default function* postsSaga() {
  yield all([watchGetPostCommentsAsync(), watchAddPostCommentAsync()]);
}
