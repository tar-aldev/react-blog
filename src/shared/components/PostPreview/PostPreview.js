import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import NavLink from "react-bootstrap/NavLink";
import { NavLink as NavLinkRouter } from "react-router-dom";
import { BadgesList } from "shared/components/BadgesList/BadgesList";
import clsx from "clsx";
import classes from "./PostPreview.module.scss";

const PostPreview = ({ post, editable, onEditPost }) => {
  const handleEditPost = () => {
    onEditPost(post._id);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-baseline">
          <NavLink
            as={NavLinkRouter}
            to={`posts/${post._id}`}
            className="px-0"
            style={{ fontSize: "1.4em" }}
          >
            {post.title}
          </NavLink>
          <BadgesList tags={post.tags} />
        </div>
        <p>{post.plainStringBody.slice(0, 200)}...</p>
        <Card.Subtitle className="d-flex justify-content-between">
          <div>
            <span className="font-weight-light">By</span> {post.author.nickName}
          </div>
        </Card.Subtitle>
        <p className="text-muted">
          Posted: {new Date(post.createdAt).toDateString()}
        </p>
        <div className="d-flex justify-content-end">
          {editable && (
            <i
              className={clsx("fas fa-edit", classes.editIcon)}
              onClick={handleEditPost}
            ></i>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

PostPreview.propTypes = {};

export default PostPreview;
