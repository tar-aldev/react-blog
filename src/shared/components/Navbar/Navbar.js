import clsx from "clsx";
import React from "react";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CustomNavLink from "shared/components/CustomNavLink/CustomNavLink";
import { logout } from "store/actions/auth";
import classes from "./Navbar.module.scss";

const Navbar = () => {
  const { currentUserId } = useSelector(state => state.authReducer);
  const history = useHistory();
  const dispatch = useDispatch();
  const onLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    history.push("/posts");
  };

  return (
    <Nav
      defaultActiveKey="/home"
      className={clsx(["flex-column bg-secondary py-2", classes.root])}
    >
      {currentUserId && <CustomNavLink to="/profile">Profile</CustomNavLink>}
      <CustomNavLink to="/posts">Posts</CustomNavLink>

      {currentUserId && (
        <>
          <CustomNavLink to="/add-post" exact>
            Add post <i className="fas fa-plus"></i>
          </CustomNavLink>
        </>
      )}
      <div className={classes.divider} />

      {currentUserId ? (
        <p className={classes.logoutButton} onClick={onLogout}>
          Logout
        </p>
      ) : (
        <>
          <CustomNavLink to="/login" className="mb-2">
            <i className="fas fa-sign-in-alt"></i>
          </CustomNavLink>
          <CustomNavLink to="/signup">
            <i className="fas fa-user-plus"></i>
          </CustomNavLink>
        </>
      )}
    </Nav>
  );
};

export default Navbar;
