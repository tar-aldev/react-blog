import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import defaultImg from "assets/img/default-avatar.png";

import classes from "./EditProfile.module.scss";
import clsx from "clsx";
const EditProfile = ({ profile, onUpdateProfile }) => {
  const uploadInputRef = useRef({});
  const [imgPreviewUrl, setImgPreviewUrl] = useState(defaultImg);
  const [uploadBtnShown, setUploadBtnShown] = useState(false);

  useEffect(() => {
    setImgPreviewUrl(`http://localhost:8000/images/${profile.avatar.fileName}`);
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      nickName: profile.nickName || "",
      email: profile.email || "",
      avatar: null,
    },
    onSubmit: updatedProfile => {
      const formData = new FormData();
      for (let [key, value] of Object.entries(updatedProfile)) {
        if (key === "avatar" && value) {
          formData.append(key, value, value.name);
        }
        if (key !== "avatar") {
          formData.append(key, value);
        }
      }
      console.log("UPDATED PROFILE");
      onUpdateProfile(formData);
      for (const pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
    },
  });

  const toggleUploadBtn = () => {
    setUploadBtnShown(!uploadBtnShown);
  };

  const handleUploadBtnClick = () => {
    uploadInputRef.current.click();
  };

  const handleInputChange = e => {
    const avatarFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function() {
      setImgPreviewUrl(reader.result);
    };
    reader.readAsDataURL(avatarFile);
    formik.setFieldValue("avatar", avatarFile);
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Row className="mb-2">
            <Col md={{ span: 4, offset: 4 }}>
              <div
                className={classes.avatarContainer}
                onMouseEnter={toggleUploadBtn}
                onMouseLeave={toggleUploadBtn}
              >
                <div className={clsx(uploadBtnShown && classes.faded)} />
                <img src={imgPreviewUrl} alt="avatar" />
                {uploadBtnShown && (
                  <>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      ref={uploadInputRef}
                      onChange={handleInputChange}
                    />
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={handleUploadBtnClick}
                      className={classes.uploadBtn}
                    >
                      Upload avatar
                    </Button>
                  </>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Form.Group>
                <Form.Control
                  size="sm"
                  name="firstName"
                  placeholder="First Name"
                  {...formik.getFieldProps("firstName")}
                />
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group>
                <Form.Control
                  size="sm"
                  name="lastName"
                  placeholder="Last Name"
                  {...formik.getFieldProps("lastName")}
                />
              </Form.Group>
            </Col>

            <Col md="6">
              <Form.Group>
                <Form.Control
                  size="sm"
                  name="nickName"
                  placeholder="Nickname"
                  {...formik.getFieldProps("nickName")}
                />
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group>
                <Form.Control
                  disabled
                  size="sm"
                  name="email"
                  placeholder="Email"
                  defaultValue={formik.values.email}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" variant="outline-primary">
            Update profile
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

EditProfile.propTypes = {
  profile: PropTypes.shape({
    email: PropTypes.string,
    gmailId: PropTypes.string,
    _id: PropTypes.string,
    nickName: PropTypes.string,
  }),
};

export default EditProfile;
