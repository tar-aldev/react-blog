import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomNavLink from "shared/components/CustomNavLink/CustomNavLink";
import { Nav } from "react-bootstrap";
import clsx from "clsx";
import classes from "./Navbar.module.scss";
import { logout } from "store/actions/auth";

const Navbar = () => {
  const { token } = useSelector(state => state.authReducer);
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
      <CustomNavLink to="/posts">Posts</CustomNavLink>

      {token && (
        <>
          <CustomNavLink to="/add-post" exact>
            Add post <i className="fas fa-plus"></i>
          </CustomNavLink>
        </>
      )}
      <div className={classes.divider} />

      {token ? (
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
