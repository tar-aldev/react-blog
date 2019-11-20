import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import classes from "./InfiniteScroll.module.scss";

const LoaderIndicator = props => {
  return (
    <div className={clsx("d-flex bg-secondary mb-1", classes.loaderContainer)}>
      <div className={clsx("bg-white", classes.loaderIndicator)}></div>
    </div>
  );
};

LoaderIndicator.propTypes = {};

export default LoaderIndicator;
