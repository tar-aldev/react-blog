import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import PostEditor from "pages/PostEditor/PostEditor";
import { addPost } from "store/actions/posts";

const AddPost = () => {
  const dispatch = useDispatch();

  const onPublishPost = post => {
    dispatch(addPost(post));
  };

  return (
    <div>
      <PostEditor onPublishPost={onPublishPost} />
    </div>
  );
};

AddPost.propTypes = {};

export default AddPost;
