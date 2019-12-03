export const GET_CURRENT_USER_ASYNC = "[User] Get current user";
export const GET_CURRENT_USER_SUCCESS = "[User] Get current user success";
export const GET_CURRENT_USER_ERROR = "[User] Get current user error";

export const UPDATE_USER_PROFILE_ASYNC = "[User] Update profile";
export const UPDATE_USER_PROFILE_SUCCESS = "[User] Update profile success";
export const UPDATE_USER_PROFILE_ERROR = "[User] Update profile error";

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

export const updateUserProfile = payload => {
  return {
    type: UPDATE_USER_PROFILE_ASYNC,
    payload,
  };
};

export const updateUserProfileSuccess = payload => {
  return {
    type: UPDATE_USER_PROFILE_SUCCESS,
    payload,
  };
};

export const updateUserProfileError = payload => {
  return {
    type: UPDATE_USER_PROFILE_ERROR,
    payload,
  };
};
