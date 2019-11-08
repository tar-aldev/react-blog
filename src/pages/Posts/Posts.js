import React, { useEffect } from "react";
import { getPosts } from "store/actions/posts";
import { useDispatch, useSelector } from "react-redux";
import { Card, Badge } from "react-bootstrap";
import { NavLink as NavLinkRouter } from "react-router-dom";
import useLoader from "hooks/useLoader";
import NavLink from "react-bootstrap/NavLink";
import { BadgesList } from "shared/components/BadgesList/BadgesList";

const Posts = () => {
  const dispatch = useDispatch();
  const postsState = useSelector(state => state.postsReducer);

  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return useLoader(() => {
    return (
      <div className="p-2">
        {postsState.posts.map((post, index) => (
          <Card key={index} className="mb-2">
            <Card.Body>
              <Card.Title>
                <NavLink
                  as={NavLinkRouter}
                  to={`posts/${post._id}`}
                  className="px-0"
                >
                  {post.title}
                </NavLink>
              </Card.Title>
              <Card.Subtitle className="d-flex justify-content-between">
                <div>By {post.author.nickName}</div>
                <BadgesList tags={post.tags} />
              </Card.Subtitle>
              <p className="text-muted">
                Posted: {new Date(post.createdAt).toDateString()}
              </p>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }, postsState);
};

export default Posts;
