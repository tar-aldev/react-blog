import React from "react";
import PropTypes from "prop-types";
import classes from "./SkeletonLine.module.scss";

const SkeletonLine = props => {
  return <span className={classes.skeleton} />;
};

SkeletonLine.propTypes = {};

export default SkeletonLine;
