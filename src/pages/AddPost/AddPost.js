import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, FormControl } from "react-bootstrap";
import { Editor } from "slate-react";
import { Value } from "slate";
import Plain from "slate-plain-serializer";
import { EditorControls } from "./EditorControls/EditorControls";
import plugins from "./plugins";
import { addPost } from "store/actions/posts";
import StyledTextNode from "./StyledTextNode/StyledTextNode";

export const AddPost = () => {
  const [editorValue, setEditorValue] = useState(Plain.deserialize(""));
  const dispatch = useDispatch();

  const editorRef = useRef({});

  useEffect(() => {
    /* const contentFromLs = getContent()
    console.log('contentFromLs', contentFromLs) */
    setInitialEditorState();
    /* if (contentFromLs) {
      setEditorValue(contentFromLs)
    } */
    editorRef.current.focus();
  }, []);

  const setInitialEditorState = () => {
    editorRef.current.setBlocks("text-left");
    editorRef.current.addMark({ type: "font-size", data: { fontSize: 16 } });
  };

  const handleEditorChange = ({ value }) => {
    /* const content = JSON.stringify(value.toJSON())
    localStorage.setItem('content', content) */
    setEditorValue(value);
  };

  const handlePublishPost = () => {
    const encodedBody = JSON.stringify(editorValue.toJSON()); // value in format for Slate editor
    const plainStringBody = Plain.serialize(editorValue); // value in common string format (so can be searched in db)
    dispatch(addPost({ encodedBody, plainStringBody }));
  };

  /* const getContent = () => {
    const contentInJson = localStorage.getItem("content");
    if (contentInJson) {
      return Value.fromJSON(JSON.parse(contentInJson));
    }
    return null;
  }; */

  return (
    <div className="py-4">
      <h6>Write your own post</h6>
      <Card style={{ height: "80%" }}>
        <Card.Body className="d-flex flex-column">
          <EditorControls editorRef={editorRef} />
          <hr className="w-100 bg-white m-0" />
          <Editor
            ref={editorRef}
            value={editorValue}
            spellCheck={false}
            plugins={plugins}
            onChange={handleEditorChange}
            style={{ padding: "12px", flexGrow: 1 }}
            onFocus={(event, editor) => {
              editor.focus();
            }}
          />
          <Button
            disabled={!Plain.serialize(editorValue).length}
            onClick={handlePublishPost}
            variant="outline-light"
            className="align-self-end"
          >
            Publish article
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
