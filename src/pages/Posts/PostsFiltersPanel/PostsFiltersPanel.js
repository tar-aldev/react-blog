import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import classes from "./PostsFiltersPanel.module.scss";
import clsx from "clsx";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import Multiselect from "shared/components/Multiselect/Multiselect";
import { getTags } from "store/actions/posts";

const PostsFiltersPanel = ({
  initialValues,
  onApplyFilters,
  authenticated,
}) => {
  const dispatch = useDispatch();
  const { tags } = useSelector(state => state.postsReducer);

  useEffect(() => {
    dispatch(getTags());
  }, []);

  const formik = useFormik({
    initialValues,
    onSubmit: filters => {
      onApplyFilters(filters);
    },
  });

  const handleChange = selectedOption => {
    formik.setFieldValue("tags", selectedOption);
  };

  return (
    <div className={clsx("bg-secondary py-3", classes.root)}>
      <h5 className="text-primary">Filters panel</h5>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label>By date:</Form.Label>
          <Form.Control
            size="sm"
            name="date"
            as="select"
            {...formik.getFieldProps("date")}
          >
            <option value="desc">New first</option>
            <option value="asc">Old first</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Check
            size="sm"
            name="mostRatedFirst"
            type="checkbox"
            label="Most rated first"
            {...formik.getFieldProps("mostRatedFirst")}
          />
        </Form.Group>
        {authenticated && (
          <Form.Group>
            <Form.Check
              size="sm"
              name="postedByMe"
              type="checkbox"
              label="Posted by me"
              {...formik.getFieldProps("postedByMe")}
            />
          </Form.Group>
        )}
        <Form.Group>
          <Form.Label>With tags:</Form.Label>
          <Multiselect
            options={tags}
            selectedOptions={formik.values.tags}
            setSelectedOptions={handleChange}
          />
        </Form.Group>
        <Button variant="outline-light" size="sm" type="submit">
          Apply filters
        </Button>
      </Form>
    </div>
  );
};

PostsFiltersPanel.propTypes = {};

export default PostsFiltersPanel;
