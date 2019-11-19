import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import NavLink from "react-bootstrap/NavLink";
import { NavLink as NavLinkRouter } from "react-router-dom";
import { BadgesList } from "shared/components/BadgesList/BadgesList";

const PostPreview = ({ post, editable }) => {
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>
          <NavLink as={NavLinkRouter} to={`posts/${post._id}`} className="px-0">
            {post.title}
          </NavLink>
          {editable && <i className="fas fa-edit"></i>}
        </Card.Title>
        <p>{post.plainStringBody.slice(0, 100)}...</p>
        <Card.Subtitle className="d-flex justify-content-between">
          <div>By {post.author.nickName}</div>
          <BadgesList tags={post.tags} />
        </Card.Subtitle>
        <p className="text-muted">
          Posted: {new Date(post.createdAt).toDateString()}
        </p>
      </Card.Body>
    </Card>
  );
};

PostPreview.propTypes = {};

export default PostPreview;
