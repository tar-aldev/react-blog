import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoaderIndicator from "shared/components/InfiniteScroll/LoaderIndicator";
import { getCurrentUser, updateUserProfile } from "store/actions/user";
import EditProfile from "./EditProfile.js/EditProfile";
import PropTypes from "prop-types";

const Profile = props => {
  const dispatch = useDispatch();
  const { currentUser, isLoading } = useSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  const handleUpdateProfile = updatedProfile => {
    console.log("UPDATED PROFILE");
    dispatch(updateUserProfile(updatedProfile));
  };

  if (currentUser) {
    return (
      <div className="py-2">
        <h4> Welcome, {currentUser.nickName}!</h4>
        <p>
          You can <span className="text-primary">edit</span> your profile on
          this page
        </p>
        <EditProfile
          profile={currentUser}
          onUpdateProfile={handleUpdateProfile}
        />
      </div>
    );
  }
  return <LoaderIndicator />;
};

Profile.propTypes = {};

export default Profile;
