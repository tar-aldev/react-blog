import React, { useEffect, useState } from "react";
import { getPosts, clearPostsData } from "store/actions/posts";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PostPreview from "shared/components/PostPreview/PostPreview";
import { InputGroup, FormControl } from "react-bootstrap";
import PostsFiltersPanel from "./PostsFiltersPanel/PostsFiltersPanel";
import InfiniteScroll from "shared/components/InfiniteScroll/InfiniteScroll";
import ArticlesSearch from "./ArticlesSearch/ArticlesSearch";

const Posts = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    date: "desc",
    mostRatedFirst: true,
    tags: [],
  });
  const { posts, total, isLoading, error } = useSelector(
    state => state.postsReducer
  );
  const { currentUserId } = useSelector(state => state.authReducer);
  const [searchStr, setSearchStr] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const history = useHistory();

  useEffect(() => {
    let queryParams = { ...filters };
    dispatch(clearPostsData());
    if (searchStr.length > 0) {
      queryParams = { ...queryParams, searchStr, searchBy };
    }
    fetchPosts(0, queryParams);
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

  const onApplyFilters = filters => {
    console.log("filters", filters);
    setFilters(filters);
    dispatch(clearPostsData());
    fetchPosts(0, { ...filters, searchStr, searchBy });
  };

  const onEditPost = postId => {
    history.push(`post-editor/${postId}`);
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
              <PostPreview
                key={post._id}
                post={post}
                editable={currentUserId === post.author._id}
                onEditPost={onEditPost}
              />
            ))}
          </InfiniteScroll>
        }
      </div>
      <PostsFiltersPanel
        initialValues={filters}
        onApplyFilters={onApplyFilters}
      />
    </div>
  );
};

export default Posts;
