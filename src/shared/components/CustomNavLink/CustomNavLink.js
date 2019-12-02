import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import classes from "./CustomNavLink.module.scss";

const CustomNavLink = ({ to, children, exact, ...rest }) => {
  return (
    <Nav.Item {...rest}>
      <Nav.Link
        as={NavLink}
        to={to}
        exact={exact}
        className={classes.link}
        activeClassName={classes.active}
      >
        {children}
      </Nav.Link>
    </Nav.Item>
  );
};

export default CustomNavLink;
