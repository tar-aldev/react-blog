import {
  AUTH_ERROR,
  SIGN_UP_SUCCESS,
  AUTH_SUCCESS,
  LOGOUT,
  GET_CURRENT_USER_ASYNC,
  GET_CURRENT_USER_SUCCESS,
} from "store/actions/auth";
import { loadItemLocalStorage } from "utilities/localStorage";
import { decodeToken } from "utilities/auth";

const getUserId = () => {
  const accessToken = loadItemLocalStorage("accessToken");
  if (!accessToken) {
    return null;
  }
  return decodeToken(accessToken)._id;
};

const initialState = {
  currentUser: null,
  accessToken: loadItemLocalStorage("accessToken"),
  refreshToken: loadItemLocalStorage("refreshToken"),
  currentUserId: getUserId(),
  error: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload,
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
        currentUserId: null,
      };
    default:
      return state;
  }
};
