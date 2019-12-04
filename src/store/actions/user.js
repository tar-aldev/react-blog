export const GET_CURRENT_USER_ASYNC = "[Auth] Get current user";
export const GET_CURRENT_USER_SUCCESS = "[Auth] Get current user success";
export const GET_CURRENT_USER_ERROR = "[Auth] Get current user error";

export const getCurrentUser = payload => {
  return {
    type: GET_CURRENT_USER_ASYNC,
    payload,
  };
};

export const getCurrentUserSuccess = payload => {
  return {
    type: GET_CURRENT_USER_SUCCESS,
    payload,
  };
};

export const getCurrentUserError = payload => {
  return {
    type: GET_CURRENT_USER_ERROR,
    payload,
  };
};
