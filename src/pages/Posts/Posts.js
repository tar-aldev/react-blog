import React, { useEffect, useState } from "react";
import { getPosts, clearPostsData } from "store/actions/posts";
import { useDispatch, useSelector } from "react-redux";

import PostPreview from "shared/components/PostPreview/PostPreview";
import { InputGroup, FormControl } from "react-bootstrap";
import PostsFiltersPanel from "./PostsFiltersPanel/PostsFiltersPanel";
import InfiniteScroll from "shared/components/InfiniteScroll/InfiniteScroll";
import ArticlesSearch from "./ArticlesSearch/ArticlesSearch";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, total, isLoading, error } = useSelector(
    state => state.postsReducer
  );
  const [searchStr, setSearchStr] = useState("");
  const [searchBy, setSearchBy] = useState("title");

  useEffect(() => {
    dispatch(clearPostsData());
    searchStr.length === 0
      ? fetchPosts(0)
      : fetchPosts(0, { searchStr, searchBy });
  }, [searchStr.length]);

  const onSearchChange = e => {
    setSearchStr(e.target.value);
  };

  const onSearchByChange = e => {
    setSearchBy(e.target.value);
  };

  const fetchPosts = (skip = posts.length, additionalQueryParams) => {
    dispatch(getPosts({ skip, limit: 6, ...additionalQueryParams }));
  };

  const onFetchMorePosts = () => {
    if (posts.length < total) {
      fetchPosts();
    }
  };

  return (
    <div>
      <div className="p-2">
        <ArticlesSearch
          searchStr={searchStr}
          onSearchChange={onSearchChange}
          searchBy={searchBy}
          onSearchByChange={onSearchByChange}
        />
        <p className="text-primary">Total Posts Amount: {total}</p>
        {
          <InfiniteScroll
            fetchMoreData={onFetchMorePosts}
            isLoading={isLoading}
          >
            {posts.map(post => (
              <PostPreview key={post._id} post={post} />
            ))}
          </InfiniteScroll>
        }
      </div>
      <PostsFiltersPanel />
    </div>
  );
};

export default Posts;
