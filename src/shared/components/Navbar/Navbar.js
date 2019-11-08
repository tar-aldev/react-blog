import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CustomNavLink from "shared/components/CustomNavLink/CustomNavLink";
import { useTrail, animated } from "react-spring";
import { Nav, Button } from "react-bootstrap";
import clsx from "clsx";
import classes from "./Navbar.module.scss";
import CustomButton from "shared/components/CustomButton/CustomButton";
import CustomNavIcon from "shared/components/CustomNavIcon/CustomNavIcon";

const topLinksInitial = [
  { to: "/posts", label: "Posts" },
  /* { link: "/users", label: "Users" }, */
];

const bottomLinksInitial = [
  { to: "/login", label: "Login" },
  { to: "/signup", label: "Signup" },
];

const Navbar = () => {
  const [topLinks, setTopLinks] = useState(topLinksInitial);
  const [bottomLinks, setBottomLinks] = useState(bottomLinksInitial);
  const { token } = useSelector(state => state.authReducer);

  useEffect(() => {
    console.log("token", token);
    if (token) {
      setBottomLinks([{ button: true, label: "Signout" }]);
    }
  }, [token]);

  const handleClick = menuLabel => {
    if (menuLabel === "Signout") {
      console.log("SIGN OUT");
    }
  };

  console.log("NAVBAR RERENDER");
  return (
    <Nav
      defaultActiveKey="/home"
      className={clsx(["flex-column", classes.root])}
    >
      <CustomNavLink to="/posts">Posts</CustomNavLink>
      <CustomNavLink to="/my-posts">My posts</CustomNavLink>
      <CustomNavLink to="/add-post">
        Add post <i className="fas fa-plus"></i>
      </CustomNavLink>
      <div className={classes.divider} />

      <CustomNavLink to="/login" className="mb-2">
        <i className="fas fa-sign-in-alt"></i>
      </CustomNavLink>
      <CustomNavLink to="/signup">
        <i className="fas fa-user-plus"></i>
      </CustomNavLink>
    </Nav>
  );
};

const LinkGroup = ({ links, handleClick }) => {
  const trail = useTrail(links.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 600,
    },
  });

  return trail.map((animationProps, index) => {
    const { label, to, button } = links[index];

    if (button) {
      return (
        <CustomButton
          variant="outline-primary"
          key={index}
          href="/"
          onClick={e => {
            e.preventDefault();
            handleClick(label);
          }}
        >
          Signout
        </CustomButton>
      );
    }
    return (
      <CustomNavLink style={animationProps} key={index} to={to}>
        {label}
      </CustomNavLink>
    );
  });
};

export default Navbar;
