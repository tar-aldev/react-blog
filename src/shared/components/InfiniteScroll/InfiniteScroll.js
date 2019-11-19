import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import PostPreview from "../PostPreview/PostPreview";

const items = Array.from(new Array(30).keys());

const InfiniteScroll = ({ children, fetchMoreData }) => {
  const scrollContainerRef = useRef({});

  useEffect(() => {}, []);

  const scrolledToBottom = domElement => {
    return (
      domElement.scrollTop + domElement.clientHeight === domElement.scrollHeight
    );
  };

  const handleScroll = e => {
    if (!scrolledToBottom(scrollContainerRef.current)) {
      return;
    }
    fetchMoreData();
  };

  return (
    <div
      ref={scrollContainerRef}
      style={{ height: "90vh", overflowY: "scroll" }}
      onScroll={handleScroll}
    >
      {children}
    </div>
  );
};

InfiniteScroll.propTypes = {};

export default InfiniteScroll;
