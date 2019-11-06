import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import AuthContainer from "shared/components/AuthContainer/AuthContainer";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosService from "services/api.service";

const requiredError = "This is a required field";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required(requiredError),
  password: Yup.string().required(requiredError),
});

const service = axiosService();

const Login = () => {
  const [googleSignUrl, setGoogleSignUrl] = useState(null);
  const { search } = useLocation();
  const history = useHistory();

  useEffect(() => {
    const getUrl = async () => {
      const { data } = await service.get("auth/google-signin-url");
      setGoogleSignUrl(data.googleLoginUrl);
    };
    getUrl();
  }, []);

  const signIn = credentials => {
    service.post("auth/signin", credentials);
  };

  useEffect(() => {
    const sendCode = async code => {
      try {
        await service.post("auth/google-signin", { code });
        console.log("history", history);
        history.push("/posts");
      } catch (error) {
        console.log("ERROR LOGGING IN");
      }
    };
    if (search.length) {
      const { code } = queryString.parse(search);
      sendCode(code);
    }
  }, [search]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    isInitialValid: false,
    onSubmit: userCredentials => {
      signIn(userCredentials);
    },
    validationSchema,
  });

  return (
    <AuthContainer>
      {search.length ? (
        <p>Signing you in...</p>
      ) : (
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              {...formik.getFieldProps("email")}
              isInvalid={formik.touched.email && formik.errors.email}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
              isInvalid={formik.touched.password && formik.errors.password}
            />
          </Form.Group>
          <Form.Group controlId="keepSignedIn">
            <Form.Check type="checkbox" label="Keep me signed in" />
          </Form.Group>
          <Button variant="outline-light" type="submit" block>
            Login
          </Button>
          <Button
            variant="outline-light"
            type="button"
            block
            disabled={!googleSignUrl}
            as="a"
            href={googleSignUrl}
          >
            Login with {""}
            <span className="text-primary">
              <i className="fab fa-google"></i>
            </span>
          </Button>
        </Form>
      )}
    </AuthContainer>
  );
};

export default Login;
