import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import SkeletonLine from "./SkeletonLine/SkeletonLine";

const LoadingPostSkeleton = props => {
  return (
    <Card className="mb-2" style={{ minHeight: "230px" }}>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center">
          <span className="px-0 nav-link w-100 mr-2">
            <SkeletonLine />
          </span>
          <div className="d-flex">
            <span
              className="mb-1 mr-1"
              style={{ width: "5rem", height: "18px" }}
            >
              <SkeletonLine />
            </span>
            <span
              className="mb-1 mr-1"
              style={{ width: "6rem", height: "18px" }}
            >
              <SkeletonLine />
            </span>
            <span className="mb-1" style={{ width: "6rem", height: "18px" }}>
              <SkeletonLine />
            </span>
          </div>
        </div>

        <div style={{ flexGrow: 1 }}>
          <p className="mb-1" style={{ fontSize: "40%" }}>
            <SkeletonLine />
          </p>
          <p className="mb-2" style={{ fontSize: "40%" }}>
            <SkeletonLine />
          </p>
        </div>

        <p className="mb-1" style={{ fontSize: "40%", width: "10%" }}>
          <SkeletonLine />
        </p>
        <p className="mb-1" style={{ fontSize: "40%", width: "20%" }}>
          <SkeletonLine />
        </p>
      </Card.Body>
    </Card>
  );
};

LoadingPostSkeleton.propTypes = {};

export default LoadingPostSkeleton;
