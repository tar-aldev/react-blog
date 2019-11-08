import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const AuthContainer = ({ children, title }) => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={8} lg={6} xl={4}>
          <Card style={{ width: "100%" }}>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              {children}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

AuthContainer.defaultProps = {
  title: "",
};
export default AuthContainer;
