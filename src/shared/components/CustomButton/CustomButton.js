import React from "react";
import { Button } from "react-bootstrap";

import classes from "./CustomButton.module.scss";
const CustomButton = ({ children, handleClick, ...rest }) => {
  return (
    <Button className={classes.root} {...rest}>
      {children}
    </Button>
  );
};

export default CustomButton;
