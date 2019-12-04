import React from "react";
import clsx from "clsx";
import classes from "./Icon.module.scss";

export default ({ fontSize, className, handleClick }) => {
  return (
    <i
      className={clsx([className, classes.editIcon])}
      style={{ fontSize }}
      onClick={handleClick}
    ></i>
  );
};
