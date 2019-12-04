import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import classes from "./EditIcon.module.scss";
const EditIcon = ({ handleClick }) => {
  return (
    <i
      className={clsx("fas fa-edit", classes.editIcon)}
      onClick={handleClick}
    ></i>
  );
};

EditIcon.propTypes = {};

export default EditIcon;
