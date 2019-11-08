import React from "react";
import { NavLink as NavLinkRouter } from "react-router-dom";
import NavLink from "react-bootstrap/NavLink";

import classes from "./CustomNavIcon.module.scss";

export default ({ children, to }) => {
  return (
    <NavLink as={NavLinkRouter} to={to} activeClassName={classes.root}>
      {children}
    </NavLink>
  );
};
