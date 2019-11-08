import { AUTH_ERROR, SIGN_UP_SUCCESS, AUTH_SUCCESS } from "store/actions/auth";

const initialState = {
  token: null,
  error: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, token: action.payload.token, isLoading: false };

    case SIGN_UP_SUCCESS:
      return { ...state, token: action.payload.token, isLoading: false };

    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
