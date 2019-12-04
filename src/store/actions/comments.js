export const GET_POST_COMMENTS_ASYNC = "[Comments] Get Post Comments async";
export const GET_POST_COMMENTS_SUCCESS =
  "[Comments] Get Posts Comments success";
export const GET_POST_COMMENTS_ERROR = "[Comments] Get Posts Comments error";

export const ADD_POST_COMMENT_ASYNC = "[Comments] Add Comment async";
export const ADD_POST_COMMENT_SUCCESS = "[Comments] Add Comment success";
export const ADD_POST_COMMENT_ERROR = "[Comments] Add Comment error";

export const UPDATE_POST_COMMENT_ASYNC = "[Comments] Update comment async";
export const UPDATE_POST_COMMENT_ERROR = "[Comments] Update comment success";
export const UPDATE_POST_COMMENT_SUCCESS = "[Comments] Update comment error";

export const DELETE_POST_COMMENT_ASYNC = "[Comments] Delete comment async";
export const DELETE_POST_COMMENT_SUCCESS = "[Comments] Delete comment success";
export const DELETE_POST_COMMENT_ERROR = "[Comments] Delete comment error";

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

export const updatePostComment = payload => {
  return {
    type: UPDATE_POST_COMMENT_ASYNC,
    payload,
  };
};

export const updatePostCommentSuccess = payload => {
  return {
    type: UPDATE_POST_COMMENT_SUCCESS,
    payload,
  };
};

export const updatePostCommentError = payload => {
  return {
    type: UPDATE_POST_COMMENT_ERROR,
    payload,
  };
};

export const deletePostComment = payload => {
  return {
    type: DELETE_POST_COMMENT_ASYNC,
    payload,
  };
};

export const deletePostCommentSuccess = payload => {
  return {
    type: DELETE_POST_COMMENT_SUCCESS,
    payload,
  };
};

export const deletePostCommentError = payload => {
  return {
    type: DELETE_POST_COMMENT_ERROR,
    payload,
  };
};
