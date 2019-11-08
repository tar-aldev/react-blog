import { putItemSingle } from "utilities/localStorage";

export const SIGN_IN_WITH_CREDENTIALS_ASYNC = "[Auth] Sign in with credentials";
export const SIGN_IN_WITH_GOOGLE_ASYNC = "[Auth] Sign in with google";
export const SIGN_IN_WITH_FACEBOOK_ASYNC = "[Auth] Sign in with facebook";
export const SIGN_IN_WITH_TWITTER_ASYNC = "[Auth] Sign in with twitter";

export const AUTH_SUCCESS = "[Auth] Sign in success";
export const AUTH_ERROR = "[Auth] Authentication error";

export const SIGN_UP_ASYNC = "[Auth] Sign up async";
export const SIGN_UP_SUCCESS = "[Auth] Sign up success";

export const signInWithCredentials = payload => {
  return {
    type: SIGN_IN_WITH_CREDENTIALS_ASYNC,
    payload,
  };
};

export const signInWithGoogle = payload => {
  return {
    type: SIGN_IN_WITH_GOOGLE_ASYNC,
    payload,
  };
};

export const authSuccess = payload => {
  console.log("sign in success", payload);
  putItemSingle("token", payload.token);
  return {
    type: AUTH_SUCCESS,
    payload,
  };
};

export const authError = payload => {
  return {
    type: AUTH_ERROR,
    payload,
  };
};

export const signUp = payload => {
  return {
    type: SIGN_UP_ASYNC,
    payload,
  };
};

export const signUpSuccess = payload => {
  return {
    type: SIGN_UP_SUCCESS,
    payload,
  };
};
