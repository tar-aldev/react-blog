import React from "react";
import { Form, Button } from "react-bootstrap";
import AuthContainer from "shared/components/AuthContainer/AuthContainer";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosService from "services/api.service";

const requiredError = "This is a required field";
// stri.required("This is a required field"),
const validationSchema = Yup.object({
  nickName: Yup.string()
    .required("This is a required field")
    .min(4, "Should be at least 4 characters long"),
  email: Yup.string()
    .email("Enter a valid email")
    .required(requiredError),
  password: Yup.string()
    .min(6)
    .required(requiredError),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords should match")
    .min(6)
    .required(requiredError),
});

const service = axiosService();
const Signup = () => {
  const signUp = userCredentials => {
    service.post(`users`, userCredentials);
  };

  const formik = useFormik({
    initialValues: {
      nickName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    isInitialValid: false,
    onSubmit: userCredentials => {
      signUp(userCredentials);
    },
    validationSchema,
  });

  return (
    <AuthContainer>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="nickName">
          <Form.Label>Nickname *</Form.Label>
          <Form.Control
            name="nickName"
            type="text"
            placeholder="Enter nickname"
            {...formik.getFieldProps("nickName")}
            isInvalid={formik.touched.nickName && formik.errors.nickName}
          />
          {formik.touched.nickName && formik.errors.nickName && (
            <Form.Control.Feedback type="invalid" className="text-info">
              {formik.errors.nickName}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email address *</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            {...formik.getFieldProps("email")}
            isInvalid={formik.touched.email && formik.errors.email}
          />
          {formik.touched.email && formik.errors.email && (
            <Form.Control.Feedback type="invalid" className="text-info">
              {formik.errors.email}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password *</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
            isInvalid={formik.touched.password && formik.errors.password}
          />
          <Form.Text className="text-muted">
            At least 6 characters long
          </Form.Text>
          {formik.touched.password && formik.errors.password && (
            <Form.Control.Feedback type="invalid" className="text-info">
              {formik.errors.password}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password *</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            {...formik.getFieldProps("confirmPassword")}
            isInvalid={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <Form.Control.Feedback type="invalid" className="text-info">
              {formik.errors.confirmPassword}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button
          variant="outline-light"
          type="submit"
          block
          disabled={!formik.isValid}
        >
          Signup
        </Button>
      </Form>
    </AuthContainer>
  );
};

export default Signup;
