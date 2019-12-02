import {
  GET_CURRENT_USER_ASYNC,
  GET_CURRENT_USER_SUCCESS,
} from "store/actions/user";

const initialState = {
  currentUser: null,
  isLoading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CURRENT_USER_ASYNC:
      return {
        ...state,
        isLoading: true,
      };

    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};
