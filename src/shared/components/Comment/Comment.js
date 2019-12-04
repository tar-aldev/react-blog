import React from "react";
import { Card } from "react-bootstrap";
import classes from "./Comment.module.scss";
import moment from "moment";
import clsx from "clsx";
import Icon from "../Icon/Icon";

export const Comment = ({
  comment,
  authorized,
  onEditComment,
  onDeleteComment,
}) => {
  const handleEditComment = () => {
    onEditComment(comment);
  };

  const handleDeleteComment = () => {
    onDeleteComment(comment._id);
  };
  return (
    <div className={clsx(classes.comment, "mb-2")}>
      <div className="d-flex justify-content-between">
        <p>
          <span className="font-weight-bold">{comment.author.nickName}</span> (
          {moment(comment.createdAt)
            .format("YYYY-MM-DD HH:mm:ss")
            .toString()}
          )
        </p>
        {authorized && (
          <p>
            <Icon
              handleClick={handleEditComment}
              className="fas fa-pencil-alt mr-2 fa-sm"
            />
            <Icon
              handleClick={handleDeleteComment}
              className="fas fa-times fa-sm"
            />
          </p>
        )}
      </div>
      <div>{comment.body}</div>
    </div>
  );
};
