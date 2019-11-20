import React, { useEffect, useState } from "react";
import { getPosts } from "store/actions/posts";
import { useDispatch, useSelector } from "react-redux";

import PostPreview from "shared/components/PostPreview/PostPreview";
import { InputGroup, FormControl } from "react-bootstrap";
import PostsFiltersPanel from "./PostsFiltersPanel/PostsFiltersPanel";
import InfiniteScroll from "shared/components/InfiniteScroll/InfiniteScroll";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, total, isLoading, error } = useSelector(
    state => state.postsReducer
  );
  const [filterStr, setFilterStr] = useState("");

  useEffect(() => {
    dispatch(getPosts({ skip: 0, limit: 5 }));
  }, []);

  const onFilterChange = e => {
    setFilterStr(e.target.value);
  };

  const onFetchMorePosts = () => {
    if (posts.length < total) {
      console.log("fetch more posts", "posts.length", posts.length);
      dispatch(getPosts({ skip: posts.length, limit: 6 }));
    }
  };

  if (!isLoading) {
    return (
      <div className="p-2">
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">
              <i className="fas fa-filter"></i>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Filter by article title..."
            value={filterStr}
            onChange={onFilterChange}
          />
        </InputGroup>
        <div className="d-flex">Total postsAmount: {total}</div>
        <InfiniteScroll fetchMoreData={onFetchMorePosts}>
          {posts.map(post => (
            <PostPreview key={post._id} post={post} />
          ))}
        </InfiniteScroll>
        <PostsFiltersPanel />
      </div>
    );
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
};

export default Posts;
