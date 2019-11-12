import React, { useState, useRef, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { Button, Card, FormControl } from "react-bootstrap";
import classes from "./AddPost.module.scss";
import clsx from "clsx";
import { EditorControls } from "./EditorControls/EditorControls";

const fontSizes = Array.from(Array(50).keys()).filter(
  value => value > 9 && value % 2 === 0
);

const fontsMap = fontSizes.reduce((acc, curr) => {
  acc[curr] = { fontSize: `${curr}px` };
  return acc;
}, {});

const rootStylesMap = {
  ...fontsMap,
};

export const AddPost = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef({});

  useEffect(() => {
    editorRef.current.focus();
  }, []);

  const handleChange = editorState => {
    setEditorState(editorState);
  };

  const handleKeyCommand = (command, newEditorState) => {
    console.log("command", command);
    const newState = RichUtils.handleKeyCommand(newEditorState, command);

    if (newState) {
      handleChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const convert = () => {
    const raw = convertToRaw(editorState.getCurrentContent());
    const unpacked = convertFromRaw(raw);
    console.log("RAW", raw, "unpacked", unpacked);
  };

  const blockStyleCustomizer = contentBlock => {
    if (contentBlock.getType() === "blockquote") {
      return classes.qoutedText;
    }
    if (contentBlock.getType() === "code-block") {
      return classes.codeBlock;
    }
  };

  return (
    <div className="py-4">
      <h6>Write your own post</h6>
      <Card style={{ height: "80%" }}>
        <Card.Body className="p-0">
          <div className={clsx(classes.editor, "p-2")}>
            <EditorControls
              fontsMap={fontsMap}
              editorState={editorState}
              handleChange={handleChange}
              editorRef={editorRef}
            />
            <hr className="my-1 bg-info" />
            <Editor
              editorState={editorState}
              handleKeyCommand={handleKeyCommand}
              onChange={handleChange}
              blockStyleFn={blockStyleCustomizer}
              customStyleMap={rootStylesMap}
              ref={editorRef}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
