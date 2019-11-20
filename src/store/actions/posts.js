export const GET_POSTS_ASYNC = "[Posts] Get Posts async";
export const GET_POSTS_SUCCESS = "[Posts] Get Posts success";
export const GET_POSTS_ERROR = "[Posts] Get Posts error";

export const GET_POST_ASYNC = "[Posts] Get Post async";
export const GET_POST_SUCCESS = "[Posts] Get Post success";
export const GET_POST_ERROR = "[Posts] Get Post error";

export const ADD_POST_ASYNC = "[Posts] Add Post async";
export const ADD_POST_SUCCESS = "[Posts] Add Post async success";
export const ADD_POST_ERROR = "[Posts] Add Post async error";

export const GET_TAGS_ASYNC = "[Posts] Get tags async";
export const GET_TAGS_SUCCESS = "[Posts] Get tags success";
export const GET_TAGS_ERROR = "[Posts] Get tags error";

export const CLEAR_POSTS_DATA = "[Posts] Clear posts data";

export const clearPostsData = () => {
  return {
    type: CLEAR_POSTS_DATA,
  };
};

export const getPosts = payload => {
  return {
    type: GET_POSTS_ASYNC,
    payload,
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

export const addPost = payload => {
  return {
    type: ADD_POST_ASYNC,
    payload,
  };
};

export const addPostSuccess = payload => {
  return {
    type: ADD_POST_SUCCESS,
    payload,
  };
};

export const addPostError = payload => {
  return {
    type: ADD_POST_ERROR,
    payload,
  };
};

export const getTags = payload => {
  return {
    type: GET_TAGS_ASYNC,
    payload,
  };
};

export const getTagsSuccess = payload => {
  return {
    type: GET_TAGS_SUCCESS,
    payload,
  };
};

export const getTagsError = payload => {
  return {
    type: GET_TAGS_ERROR,
    payload,
  };
};
