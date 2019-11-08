import React from "react";
import { Button } from "react-bootstrap";

export const TwitterAuth = () => {
  return (
    <Button variant="outline-light" type="button" block as="a">
      Login with {""}
      <span className="text-info">
        <i className="fab fa-twitter"></i>
      </span>
    </Button>
  );
};
