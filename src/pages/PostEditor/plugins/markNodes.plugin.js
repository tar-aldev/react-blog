import React from "react";
import StyledTextNode from "../StyledTextNode/StyledTextNode";
import CodeNode from "../Nodes/Code/Code";
import FontSizeNode from "../Nodes/FontSize/FontSize";

const markRender = options => {
  const { component, markType } = options;

  return {
    renderMark: (props, editor, next) => {
      if (props.mark.type === markType) {
        return component(props);
      }
      return next();
    },
  };
};

const boldText = markRender({
  markType: "bold",
  component: props => <StyledTextNode {...props} />,
});

const italicText = markRender({
  markType: "italic",
  component: props => <StyledTextNode {...props} />,
});

const underlinedText = markRender({
  markType: "underlined",
  component: props => <StyledTextNode {...props} />,
});

const codeText = markRender({
  markType: "code",
  component: props => <CodeNode {...props} />,
});

const fontSize = markRender({
  markType: "font-size",
  component: props => <FontSizeNode {...props} />,
});

export default [boldText, italicText, underlinedText, codeText, fontSize];
