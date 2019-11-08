import { put, takeEvery, all, call } from "redux-saga/effects";
import apiService from "services/api.service";
import {
  GET_POST_COMMENTS_ASYNC,
  getPostCommentsSuccess,
} from "store/actions/comments";

const service = apiService();

function* getPostCommentsAsync({ payload }) {
  try {
    const { data } = yield call(service.get, `comments?post=${payload}`);
    console.log("data", data);
    yield put(getPostCommentsSuccess(data.comments));
  } catch (error) {
    console.log("ERR", error);
  }
}

function* watchGetPostCommentsAsync() {
  yield takeEvery(GET_POST_COMMENTS_ASYNC, getPostCommentsAsync);
}

export default function* postsSaga() {
  yield all([watchGetPostCommentsAsync()]);
}
