import React, { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { Editor } from "slate-react";
import Plain from "slate-plain-serializer";
import { EditorControls } from "./EditorControls/EditorControls";
import plugins from "./plugins";
import { addPost, getTags, getPost } from "store/actions/posts";
import Multiselect from "shared/components/Multiselect/Multiselect";
import Serializer from "slate-plain-serializer";
import classes from "./PostEditor.module.scss";

import clsx from "clsx";

const PostEditor = props => {
  const [editorValue, setEditorValue] = useState(
    props.postContent || Serializer.deserialize("")
  );
  const [selectedTags, setSelectedTags] = useState(props.postTags || []);
  const [title, setTitle] = useState(props.postTitle || "");
  const dispatch = useDispatch();
  const { tags } = useSelector(state => state.postsReducer);
  const editorRef = useRef({});

  useEffect(() => {
    dispatch(getTags());
    setInitialEditorState();
    editorRef.current.focus();
  }, []);

  const setInitialEditorState = () => {
    editorRef.current.setBlocks("text-left");
    editorRef.current.addMark({ type: "font-size", data: { fontSize: 16 } });
  };

  const handleEditorChange = ({ value }) => {
    setEditorValue(value);
  };

  const handlePublishPost = () => {
    const encodedBody = JSON.stringify(editorValue.toJSON()); // value in format for Slate editor
    const plainStringBody = Plain.serialize(editorValue); // value in common string format (so can be searched in db)
    props.onPublishPost({
      encodedBody,
      plainStringBody,
      title,
      tags: selectedTags.map(tag => ({ _id: tag._id })),
    });
  };

  const onTitleChange = e => {
    setTitle(e.target.value);
  };

  const canSubmit = useMemo(() => {
    return (
      Plain.serialize(editorValue).length > 400 &&
      title.length > 6 &&
      selectedTags.length > 0
    );
  }, [editorValue, title.length, selectedTags.length]);

  return (
    <div className="py-2">
      <h5>{props.editorTitle || `Write your own post`}</h5>
      <Form>
        <Form.Group controlId="formBasicEmail" className="bg-secondary mb-2">
          <Form.Control
            value={title}
            onChange={onTitleChange}
            type="text"
            placeholder="Article title..."
            className="bg-secondary text-white"
          />
        </Form.Group>
        <Multiselect
          options={tags}
          selectedOptions={selectedTags}
          setSelectedOptions={setSelectedTags}
        />
      </Form>
      <div
        style={{ minHeight: "72vh" }}
        className={clsx("bg-secondary mb-2", classes.editorWrapper)}
        onClick={editorRef.current.focus}
      >
        <div className="d-flex flex-column">
          <EditorControls editorRef={editorRef} />
          <hr className="w-100 bg-white m-0" />
          <Editor
            ref={editorRef}
            value={editorValue}
            spellCheck={false}
            plugins={plugins}
            onChange={handleEditorChange}
            onFocus={(event, editor) => {
              editor.focus();
            }}
          />
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <Button
          disabled={!canSubmit}
          onClick={handlePublishPost}
          variant="outline-light"
        >
          {props.submitButtonTitle || `Publish article`}
        </Button>
      </div>
    </div>
  );
};

export default PostEditor;
