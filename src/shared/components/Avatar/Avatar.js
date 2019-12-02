import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ size }) => {
  return (
    <div style={{ padding: "0.5rem 1rem" }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={size / 2} fill="#aeaeae" />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fill="white"
          fontSize="16px"
          dy=".3em"
        >
          BC
        </text>
        Sorry, your browser does not support inline SVG.
      </svg>
    </div>
  );
};

Avatar.propTypes = {};
Avatar.defaultProps = {
  size: 40,
};
export default Avatar;
