import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import AuthContainer from "pages/Login/AuthContainer/AuthContainer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { GoogleAuth } from "pages/Login/GoogleAuth/GoogleAuth";
import { signInWithGoogle, signInWithCredentials } from "store/actions/auth";
import { TwitterAuth } from "./TwitterAuth/TwitterAuth";
import { FacebookAuth } from "./FacebookAuth/FacebookAuth";

const requiredError = "This is a required field";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required(requiredError),
  password: Yup.string().required(requiredError),
});

const Login = () => {
  const { token, error, isLoading } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleGoogleSignin = code => {
    dispatch(signInWithGoogle({ code, redirect: history.push }));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    isInitialValid: false,
    onSubmit: credentials => {
      dispatch(signInWithCredentials({ credentials, redirect: history.push }));
    },
    validationSchema,
  });

  return (
    <AuthContainer>
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
        <p className="text-center">or</p>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 300, hide: 400 }}
          overlay={
            <Tooltip>
              Don't want to fill the forms? Just use your google account
            </Tooltip>
          }
        >
          <div>
            <GoogleAuth onSignInSuccess={handleGoogleSignin} />
          </div>
        </OverlayTrigger>

        {/* <TwitterAuth />
        <FacebookAuth /> */}
      </Form>
      {error && <p className="text-danger">{error}</p>}
    </AuthContainer>
  );
};

export default Login;
