import {
  GET_POST_COMMENTS_ASYNC,
  GET_POST_COMMENTS_SUCCESS,
  ADD_POST_COMMENT_SUCCESS,
} from "store/actions/comments";

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POST_COMMENTS_ASYNC:
      return { ...state, isLoading: true };

    case GET_POST_COMMENTS_SUCCESS:
      return { ...state, comments: action.payload };

    case ADD_POST_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    default:
      return state;
  }
};
