import React from "react";
import clsx from "clsx";
import classes from "./Icon.module.scss";

export default ({ fontSize, className }) => {
  return (
    <i className={clsx([className, classes.root])} style={{ fontSize }}></i>
  );
};

Icon.defaultProps = {
  fontSize: "inherit",
};
