import React, { useMemo } from "react";
import PropTypes from "prop-types";

const stylesObject = {
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  underlined: { textDecoration: "underline" },
};

const StyledTextNode = props => {
  const style = useMemo(() => {
    return stylesObject[props.mark.type] || {};
  }, [props.mark.type]);

  return (
    <span {...props.attributes} style={style}>
      {props.children}
    </span>
  );
};

StyledTextNode.propTypes = {};

export default StyledTextNode;
