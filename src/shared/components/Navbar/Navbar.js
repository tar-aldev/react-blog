import React from "react";
import CustomNavLink from "shared/components/CustomNavLink/CustomNavLink";
import { useTrail, animated } from "react-spring";
import { Nav } from "react-bootstrap";
import clsx from "clsx";
import classes from "./Navbar.module.scss";

const topLinks = [
  { link: "/posts", label: "Posts" },
  /* { link: "/users", label: "Users" }, */
];

const bottomLinks = [
  { link: "/login", label: "Login" },
  { link: "/signup", label: "Signup" },
];

const Navbar = () => {
  return (
    <Nav
      defaultActiveKey="/home"
      className={clsx(["flex-column", classes.root])}
    >
      <LinkGroup links={topLinks} />
      <div className={classes.divider} />
      <LinkGroup links={bottomLinks} />
    </Nav>
  );
};

const LinkGroup = ({ links }) => {
  const trail = useTrail(links.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 600,
    },
  });

  const AnimatedNavLink = animated(CustomNavLink);

  return trail.map((animationProps, index) => {
    const { label, link } = links[index];
    return (
      <AnimatedNavLink style={animationProps} key={index} to={link}>
        {label}
      </AnimatedNavLink>
    );
  });
};

export default Navbar;
