import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import posts from "store/reducers/posts";
import { getPost } from "store/actions/posts";
import useLoader from "hooks/useLoader";
import { Card, Badge } from "react-bootstrap";
import { getPostComments, addPostComment } from "store/actions/comments";
import { Comment } from "shared/components/Comment/Comment";
import { AddComment } from "shared/components/AddComment/AddComment";
import { BadgesList } from "shared/components/BadgesList/BadgesList";
import { Editor } from "slate-react";
import plugins from "pages/PostEditor/plugins";

export const Post = () => {
  const { postId } = useParams();
  const { post, isLoading: postLoading, error: postError } = useSelector(
    state => state.postsReducer
  );
  const { currentUserId } = useSelector(state => state.authReducer);

  const {
    comments,
    isLoading: commentsLoading,
    error: commentError,
  } = useSelector(state => state.commentsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost({ id: postId }));
    dispatch(getPostComments({ post: postId }));
  }, []);

  const handleAddComment = ({ comment, resetForm }) => {
    dispatch(
      addPostComment({ comment: { ...comment, post: postId }, resetForm })
    );
  };
  return (
    <section className="py-2">
      <div className="mb-4">
        {post && (
          <Card>
            <Card.Body>
              <Card.Title className="text-primary">{post.title}</Card.Title>
              <Card.Subtitle className="d-flex justify-content-between">
                <div>By {post.author.nickName}</div>
                <BadgesList tags={post.tags} />
              </Card.Subtitle>
              <Editor
                readOnly
                value={post.slateValue}
                spellCheck={false}
                style={{ padding: "12px", flexGrow: 1 }}
                plugins={plugins}
              />
              <p className="text-muted text-right">
                Posted: {new Date(post.createdAt).toDateString()}
              </p>
            </Card.Body>
          </Card>
        )}
      </div>
      {currentUserId && (
        <div className="d-flex flex-column align-items-center">
          <AddComment onAddComment={handleAddComment} />
          <div className="w-50">
            {comments.map(comment => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
