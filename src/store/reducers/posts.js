import {
  GET_POSTS_SUCCESS,
  GET_POST_SUCCESS,
  GET_POST_ASYNC,
  GET_TAGS_SUCCESS,
  GET_POSTS_ASYNC,
  CLEAR_POSTS_DATA,
  UPDATE_POST_SUCCESS,
} from "store/actions/posts";

const initialState = {
  posts: [],
  total: 0,
  post: null,
  tags: [],
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_POSTS_DATA:
      return {
        ...state,
        posts: [],
      };
    case GET_POSTS_ASYNC:
      return {
        ...state,
        isLoading: true,
      };
    case GET_POSTS_SUCCESS:
      const { payload } = action;
      return {
        ...state,
        posts: [...state.posts, ...payload.posts],
        total: payload.total,
        isLoading: false,
      };
    case GET_POST_ASYNC:
      return {
        ...state,
        isLoading: true,
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        isLoading: false,
      };

    case UPDATE_POST_SUCCESS:
      const updatedPost = action.payload
      return {
        ...state,
        post: updatedPost
      }
    case GET_TAGS_SUCCESS:
      return {
        ...state,
        tags: action.payload,
      };
    default:
      return state;
  }
};
