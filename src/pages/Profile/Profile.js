import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getPosts } from "store/actions/posts";
import { getCurrentUser } from "store/actions/user";

const Profile = props => {
  const dispatch = useDispatch();
  const { currentUser, isLoading } = useSelector(state => state.userReducer);

  console.log("user", currentUser);
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  if (currentUser) {
    return <div>Welcome, {currentUser.nickName}</div>;
  }
  return <p>Loading...</p>;
};

Profile.propTypes = {};

export default Profile;
