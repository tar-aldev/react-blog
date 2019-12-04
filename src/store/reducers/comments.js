import {
  GET_POST_COMMENTS_ASYNC,
  GET_POST_COMMENTS_SUCCESS,
  ADD_POST_COMMENT_SUCCESS,
  UPDATE_POST_COMMENT_ASYNC,
  UPDATE_POST_COMMENT_SUCCESS,
  DELETE_POST_COMMENT_SUCCESS,
} from "store/actions/comments";

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POST_COMMENTS_ASYNC:
    case UPDATE_POST_COMMENT_ASYNC:
      return { ...state, isLoading: true };

    case GET_POST_COMMENTS_SUCCESS:
      return { ...state, comments: payload };

    case ADD_POST_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [payload, ...state.comments],
      };

    case UPDATE_POST_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment._id === payload._id ? payload : comment
        ),
      };
    case DELETE_POST_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter(comment => comment._id !== payload),
      };
    default:
      return state;
  }
};
