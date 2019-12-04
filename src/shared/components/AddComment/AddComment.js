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

export const AddComment = ({
  onAddComment,
  onEditComment,
  onCancelEditing,
  initialValues,
  ...rest
}) => {
  const formik = useFormik({
    initialValues: {
      body: (initialValues && initialValues.body) || "",
    },
    onSubmit: comment => {
      if (initialValues) {
        onEditComment({
          comment,
          _id: initialValues._id,
        });
      } else {
        onAddComment({ comment, resetForm: formik.resetForm });
      }
    },
    enableReinitialize: true,
    validationSchema,
  });

  const handleEditingCancel = () => {
    onCancelEditing(initialValues._id);
  };

  return (
    <div className="mb-4" {...rest}>
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
        <div className="d-flex justify-content-end">
          {initialValues && (
            <Button
              variant="outline-light"
              onClick={handleEditingCancel}
              className="mr-1"
            >
              Cancel
            </Button>
          )}
          <Button
            variant="outline-light"
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
          >
            {initialValues ? `Save changes` : `Add comment`}
          </Button>
        </div>
      </Form>
    </div>
  );
};
