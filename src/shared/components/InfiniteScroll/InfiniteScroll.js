import React, { useEffect, useRef } from "react";
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
        className={classes.listWrapper}
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
