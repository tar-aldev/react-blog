import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import InfiniteScroll from "shared/components/InfiniteScroll/InfiniteScroll";
import PostPreview from "shared/components/PostPreview/PostPreview";
import { clearPostsData, getPosts } from "store/actions/posts";
import ArticlesSearch from "./ArticlesSearch/ArticlesSearch";
import LoadingPostSkeleton from "./LoadingPostSkeleton";
import PostsFiltersPanel from "./PostsFiltersPanel/PostsFiltersPanel";

const fakeArray = Array.from(new Array(6)).map((_, idx) => idx);

const Posts = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    date: "desc",
    mostRatedFirst: true,
    postedByMe: false,
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

  const fetchPosts = (skip, additionalQueryParams) => {
    console.log("fetchPosts", { skip, ...additionalQueryParams });
    dispatch(getPosts({ skip, limit: 6, ...additionalQueryParams }));
  };

  const onFetchMorePosts = () => {
    if (posts.length < total) {
      fetchPosts(posts.length, { ...filters, searchStr, searchBy });
    }
  };

  const onApplyFilters = filters => {
    console.log("filters", filters);
    setFilters(filters);
    dispatch(clearPostsData());
    fetchPosts(0, { ...filters, searchStr, searchBy });
  };

  const onEditPost = postId => {
    history.push(`edit-post/${postId}`);
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
          <InfiniteScroll fetchMoreData={onFetchMorePosts} isLoading={false}>
            {isLoading
              ? fakeArray.map((_, idx) => <LoadingPostSkeleton key={idx} />)
              : posts.map(post => (
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
        authenticated={!!currentUserId}
      />
    </div>
  );
};

export default Posts;

/* 


*/
