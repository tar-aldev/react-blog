import React, { useEffect } from "react";
import { getPosts } from "store/actions/posts";
import { useDispatch, useSelector } from "react-redux";

import useLoader from "hooks/useLoader";

import PostPreview from "shared/components/PostPreview/PostPreview";

const Posts = () => {
  const dispatch = useDispatch();
  const postsState = useSelector(state => state.postsReducer);

  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return useLoader(() => {
    return (
      <div className="p-2">
        {postsState.posts.map(post => (
          <PostPreview key={post._id} post={post} />
        ))}
      </div>
    );
  }, postsState);
};

export default Posts;
