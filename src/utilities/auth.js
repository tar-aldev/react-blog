import jwt_decode from "jwt-decode";
import moment from "moment";

export const decodeToken = token => {
  console.log("token", token);
  try {
    return jwt_decode(token);
  } catch (error) {
    console.log("Err decoding token", error);
  }
};

export const checkTokenExpired = token => {
  const currentTime = moment();
  const expirationTime = moment.unix(token.exp);
  return currentTime.isAfter(expirationTime);
};
