export const GET_POST_COMMENTS_ASYNC = "[Comments] Get Post Comments async";
export const GET_POST_COMMENTS_SUCCESS =
  "[Comments] Get Posts Comments success";
export const GET_POST_COMMENTS_ERROR = "[Comments] Get Posts Comments error";

export const getPostComments = postId => {
  return {
    type: GET_POST_COMMENTS_ASYNC,
    payload: postId,
  };
};

export const getPostCommentsSuccess = payload => {
  return {
    type: GET_POST_COMMENTS_SUCCESS,
    payload,
  };
};

export const getPostCommentsError = payload => {
  return {
    type: GET_POST_COMMENTS_ERROR,
    payload,
  };
};
