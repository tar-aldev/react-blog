import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import clsx from "clsx";
import * as Yup from "yup";

import classes from "./AddComment.module.scss";

const requiredError = "This is a required field";

const validationSchema = Yup.object({
  body: Yup.string()
    .required(requiredError)
    .min(6, "THe comment should be at least 6 characters long"),
});

export const AddComment = ({ onAddComment, ...rest }) => {
  const formik = useFormik({
    initialValues: {
      body: "",
    },
    onSubmit: comment => {
      onAddComment({ comment, resetForm: formik.resetForm });
    },
    validationSchema,
  });
  return (
    <div className="w-50 mb-4" {...rest}>
      <h6 className="d-flex justify-content-end text-muted text-small">
        What do you think about this?
      </h6>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="body" className="mb-1">
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
    </div>
  );
};
