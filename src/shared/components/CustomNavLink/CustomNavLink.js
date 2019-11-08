import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import classes from "./CustomNavLink.module.scss";

const CustomNavLink = props => {
  const { to, children } = props;
  return (
    <Nav.Item {...props}>
      <Nav.Link
        as={NavLink}
        to={to}
        className={classes.link}
        activeClassName={classes.active}
      >
        {children}
      </Nav.Link>
    </Nav.Item>
  );
};

export default CustomNavLink;
