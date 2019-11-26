import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import PostEditor from "pages/PostEditor/PostEditor";
import { getPost, updatePost } from "store/actions/posts";
import LoaderIndicator from "shared/components/InfiniteScroll/LoaderIndicator";
import { Button } from "react-bootstrap";

const EditPost = props => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { post, isLoading, error } = useSelector(state => state.postsReducer);
  const [postUpdated, setPostUpdated] = useState(false);

  useEffect(() => {
    dispatch(getPost({ id: postId }));
  }, []);

  const onPublishPost = updatedPost => {
    console.log({ updatedPost, post });
    dispatch(
      updatePost({
        id: postId,
        post: updatedPost,
        postUpdated: setPostUpdated,
      })
    );
  };

  if (postUpdated) {
    return (
      <div>
        <h6 className="text-center">
          <i className="fas fa-check text-success"></i> Post updated!
        </h6>
        <Button onClick={() => setPostUpdated(false)}>Back to article</Button>
      </div>
    );
  }
  if (post) {
    return (
      <PostEditor
        editorTitle="Edit the post"
        submitButtonTitle="Save changes"
        onPublishPost={onPublishPost}
        postTitle={post.title}
        postContent={post.slateValue}
        postTags={post.tags}
      />
    );
  }
  if (!post || isLoading) {
    return <LoaderIndicator />;
  }
};

EditPost.propTypes = {};

export default EditPost;
