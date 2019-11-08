import React from "react";
import { Card } from "react-bootstrap";
import classes from "./Comment.module.scss";

export const Comment = ({ comment }) => {
  console.log("comment", comment);
  return (
    <Card key={comment._id} className={classes.card}>
      <Card.Body className={classes.cardBody}>
        <Card.Title className="text-primary">{comment.title}</Card.Title>
        <Card.Subtitle className="d-flex justify-content-end text-muted">
          <div>By {comment.author.nickName}</div>
        </Card.Subtitle>
        <hr className="bg-white" />
        <div>
          <Card.Text>{comment.body}</Card.Text>
          <p className="text-muted text-right">
            Posted: {new Date(comment.createdAt).toDateString()}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};
