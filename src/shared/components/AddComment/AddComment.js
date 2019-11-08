import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import clsx from "clsx";
import * as Yup from "yup";

import classes from "./AddComment.module.scss";

const requiredError = "This is a required field";

const validationSchema = Yup.object({
  title: Yup.string().required(requiredError),
  body: Yup.string()
    .required(requiredError)
    .min(6, "THe comment should be at least 6 characters long"),
});

export const AddComment = ({ onAddComment, ...rest }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    onSubmit: comment => {
      console.log("SUBMIT");
      onAddComment(comment);
    },
    validationSchema,
  });
  return (
    <Card className="w-50 mb-4" {...rest}>
      <Card.Body>
        <Card.Subtitle className="d-flex justify-content-end text-muted text-small">
          What do you think about this...
        </Card.Subtitle>

        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="body">
            <Form.Control
              className={clsx(
                classes.commentInput,
                "bg-transparent",
                "text-white"
              )}
              name="title"
              type="text"
              placeholder="Enter title..."
              {...formik.getFieldProps("title")}
              isInvalid={formik.touched.title && formik.errors.title}
            />
            {formik.touched.title && formik.errors.title && (
              <Form.Control.Feedback className="text-info" type="invalid">
                {formik.errors.title}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <hr className="bg-white" />
          <Form.Group controlId="body">
            <Form.Control
              className={clsx(
                classes.commentInput,
                "bg-transparent",
                "text-white"
              )}
              rows="3"
              as="textarea"
              name="body"
              type="text"
              placeholder="Enter comment..."
              {...formik.getFieldProps("body")}
              isInvalid={formik.touched.body && formik.errors.body}
            />
            {formik.touched.body && formik.errors.body && (
              <Form.Control.Feedback className="text-info" type="invalid">
                {formik.errors.body}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Button
            variant="outline-light"
            type="submit"
            className="float-right"
            disabled={!formik.isValid || !formik.dirty}
          >
            Add comment
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
