import React from "react";
import { Card } from "react-bootstrap";
import classes from "./Comment.module.scss";
import moment from "moment";
import clsx from "clsx";

export const Comment = ({ comment }) => {
  return (
    <div className={clsx(classes.comment, "mb-2")}>
      <div className="d-flex">
        <p>
          <span className="font-weight-bold">{comment.author.nickName}</span> (
          {moment(comment.createdAt)
            .format("YYYY-MM-DD HH:mm:ss")
            .toString()}
          )
        </p>
      </div>
      <div>{comment.body}</div>
    </div>
  );
};
