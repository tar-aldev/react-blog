import {
  AUTH_ERROR,
  SIGN_UP_SUCCESS,
  AUTH_SUCCESS,
  LOGOUT,
} from "store/actions/auth";

const initialState = {
  token: null,
  error: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        error: null,
        isLoading: false,
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        error: null,
        isLoading: false,
      };

    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};
