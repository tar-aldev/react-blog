export const GET_POST_COMMENTS_ASYNC = "[Comments] Get Post Comments async";
export const GET_POST_COMMENTS_SUCCESS =
  "[Comments] Get Posts Comments success";
export const GET_POST_COMMENTS_ERROR = "[Comments] Get Posts Comments error";

export const ADD_POST_COMMENT_ASYNC = "[Comments] Add Comment async";
export const ADD_POST_COMMENT_SUCCESS = "[Comments] Add Comment success";
export const ADD_POST_COMMENT_ERROR = "[Comments] Add Comment error";

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

export const getPostCommentError = payload => {
  return {
    type: GET_POST_COMMENTS_ERROR,
    payload,
  };
};

export const addPostComment = payload => {
  return {
    type: ADD_POST_COMMENT_ASYNC,
    payload,
  };
};

export const addPostCommentSuccess = payload => {
  return {
    type: ADD_POST_COMMENT_SUCCESS,
    payload,
  };
};

export const addPostCommentsError = payload => {
  return {
    type: ADD_POST_COMMENT_ERROR,
    payload,
  };
};
