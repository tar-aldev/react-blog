import React, { useEffect, useState } from "react";
import queryString from "query-string";
import axiosService from "services/api.service";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const service = axiosService();

export const GoogleAuth = ({ onSignInSuccess, onSignInFail }) => {
  const [googleSignUrl, setGoogleSignUrl] = useState(null);
  const { search } = useLocation();

  useEffect(() => {
    const getUrl = async () => {
      const { data } = await service.get("auth/google-signin-url");
      setGoogleSignUrl(data.googleLoginUrl);
    };
    getUrl();
  }, []);

  useEffect(() => {
    if (search.length) {
      const { code } = queryString.parse(search);
      onSignInSuccess({ code });
    }
  }, [search]);

  return (
    <Button
      variant="outline-light"
      type="button"
      block
      disabled={!googleSignUrl}
      as="a"
      href={googleSignUrl}
    >
      Continue with {""}
      <span className="text-danger">
        <i className="fab fa-google"></i>
      </span>
    </Button>
  );
};
