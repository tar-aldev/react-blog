import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink, useLocation, useHistory } from "react-router-dom";

import classes from "./CustomNavLink.module.scss";
import { useSpring, animated } from "react-spring";

const CustomNavLink = props => {
  const { to, children } = props;

  const location = useLocation();
  const animationProps = useSpring({
    opacity: location.pathname === to ? 1 : 0,
    config: { duration: 400 },
  });
  return (
    <Nav.Item {...props} className={classes.link}>
      <Nav.Link as={NavLink} to={to}>
        {children}
      </Nav.Link>
      <animated.div
        style={animationProps}
        className={classes.activeLinkIndicator}
      />
    </Nav.Item>
  );
};

export default CustomNavLink;
