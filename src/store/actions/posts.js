export const GET_POSTS_ASYNC = "[Posts] Get Posts async";
export const GET_POSTS_SUCCESS = "[Posts] Get Posts success";
export const GET_POSTS_ERROR = "[Posts] Get Posts error";

export const GET_POST_ASYNC = "[Posts] Get Post async";
export const GET_POST_SUCCESS = "[Posts] Get Post success";
export const GET_POST_ERROR = "[Posts] Get Post error";

export const getPosts = () => {
  return {
    type: GET_POSTS_ASYNC,
  };
};

export const getPostsSuccess = payload => {
  return {
    type: GET_POSTS_SUCCESS,
    payload,
  };
};

export const getPostsError = payload => {
  return {
    type: GET_POSTS_ERROR,
    payload,
  };
};

export const getPost = id => {
  return {
    type: GET_POST_ASYNC,
    payload: id,
  };
};

export const getPostSuccess = payload => {
  return {
    type: GET_POST_SUCCESS,
    payload,
  };
};

export const getPostError = payload => {
  return {
    type: GET_POST_ERROR,
    payload,
  };
};
