import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import clsx from "clsx";
import { RichUtils } from "draft-js";

import classes from "./EditorControls.module.scss";

const TEXT_CONTROLS_LIST = [
  {
    value: "BOLD", // what is passed to RichUtils.toggleInlineStyle
    icon: "fas fa-bold",
  },
  {
    value: "ITALIC",
    icon: "fas fa-italic",
  },
  {
    value: "UNDERLINE",
    icon: "fas fa-underline",
  },
  {
    value: "STRIKETHROUGH",
    icon: "fas fa-strikethrough",
  },
];

const BLOCK_TYPES_LIST = [
  {
    value: "blockquote",
    icon: "fas fa-quote-left",
  },
  {
    value: "code-block",
    icon: "fas fa-code",
  },
];

export const EditorControls = ({
  fontsMap,
  handleChange,
  editorState,
  editorRef,
}) => {
  const [menuShown, setMenuShown] = useState(false);
  const [selectedFontSize, setSelectedFontSize] = useState(14);

  useEffect(() => {}, []);

  const currentInlineStyles = editorState.getCurrentInlineStyle();

  const toggleFontsMenu = e => {
    e.preventDefault();
    setMenuShown(!menuShown);
  };

  const preventDefault = (action, ...args) => e => {
    e.preventDefault();
    action(...args);
  };

  const toggleBlock = value => {
    handleChange(RichUtils.toggleBlockType(editorState, value));
  };

  const toggleInlineStyle = value => {
    handleChange(RichUtils.toggleInlineStyle(editorState, value));
  };

  const toggleFontSize = value => {
    console.log(value, "font size", editorRef.current);
    const newEditroState = RichUtils.toggleInlineStyle(
      editorState,
      value.toString()
    );
    setSelectedFontSize(value);
    handleChange(newEditroState);
    setMenuShown(false);
  };

  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  console.log("currentInlineStyles", currentInlineStyles.toObject());
  /* ***BUG*** when toolbar button is clicked and editor is not focused styling is not applied */
  return (
    <div className={classes.controls}>
      {TEXT_CONTROLS_LIST.map(control => (
        <Button
          key={`${control.value}-${control.icon}`}
          variant="outline-light"
          size="sm"
          onMouseDown={preventDefault(toggleInlineStyle, control.value)}
          className={clsx(
            classes.controlBtn,
            currentInlineStyles.has(control.value) && classes.highlight
          )}
        >
          <i className={control.icon}></i>
        </Button>
      ))}

      <div className={clsx(classes.verticalDivider, "bg-white mx-1")} />

      {BLOCK_TYPES_LIST.map(blockTypeControl => (
        <Button
          key={`${blockTypeControl.value}-${blockTypeControl.icon}`}
          variant="outline-light"
          size="sm"
          onMouseDown={preventDefault(toggleBlock, blockTypeControl.value)}
          className={clsx(
            classes.controlBtn,
            blockTypeControl.value === blockType && classes.highlight
          )}
        >
          <i className={blockTypeControl.icon}></i>
        </Button>
      ))}

      <div className={classes.customSelectWrapper}>
        <Button
          variant="outline-light"
          size="sm"
          className={classes.controlBtn}
          onMouseDown={toggleFontsMenu}
        >
          {selectedFontSize}
        </Button>
        {menuShown && (
          <div className={classes.selectMenu}>
            {Object.keys(fontsMap).map(font => (
              <Button
                key={font}
                variant="outline-light"
                size="sm"
                className={classes.controlBtn}
                onMouseDown={preventDefault(toggleFontSize, font)}
              >
                {font}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
