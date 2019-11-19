import React from "react";
import PropTypes from "prop-types";

import classes from "./PostsFiltersPanel.module.scss";
import clsx from "clsx";

const PostsFiltersPanel = props => {
  return (
    <div className={clsx("bg-secondary py-3", classes.root)}>Filter panel</div>
  );
};

PostsFiltersPanel.propTypes = {};

export default PostsFiltersPanel;
