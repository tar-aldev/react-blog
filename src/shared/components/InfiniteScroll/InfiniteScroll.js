import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import PostPreview from "../PostPreview/PostPreview";
import clsx from "clsx";
import classes from "./InfiniteScroll.module.scss";
import LoaderIndicator from "./LoaderIndicator";

const InfiniteScroll = ({ children, fetchMoreData, isLoading }) => {
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

  console.log("isLoading", isLoading);
  return (
    <div style={{ height: "88vh" }}>
      <div
        ref={scrollContainerRef}
        style={{ height: "86vh", overflowY: "scroll" }}
        onScroll={handleScroll}
      >
        {children}
      </div>
      <div className={classes.loaderWrapper}>
        {isLoading && <LoaderIndicator />}
      </div>
    </div>
  );
};

InfiniteScroll.propTypes = {};

export default InfiniteScroll;
