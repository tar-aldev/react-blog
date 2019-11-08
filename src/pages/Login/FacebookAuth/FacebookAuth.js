import React from "react";
import { Button } from "react-bootstrap";

export const FacebookAuth = () => {
  return (
    <Button variant="outline-light" type="button" block as="a">
      Login with {""}
      <span style={{ color: "#0b03fc" }}>
        <i className="fab fa-facebook-f"></i>
      </span>
    </Button>
  );
};
