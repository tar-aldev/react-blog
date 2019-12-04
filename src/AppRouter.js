import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Posts from "pages/Posts/Posts";
import Users from "pages/Users/Users";
import Login from "pages/Login/Login";
import Signup from "pages/Signup/Signup";
import { Post } from "pages/Post/Post";
import EditPost from "pages/EditPost/EditPost";
import AddPost from "pages/AddPost/AddPost";
import Profile from "pages/Profile/Profile";

const AppRouter = () => {
  return (
    <Switch>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/posts/:postId">
        <Post />
      </Route>
      <Route path="/posts">
        <Posts />
      </Route>
      <Route path="/edit-post/:postId">
        <EditPost />
      </Route>
      <Route path="/add-post">
        <AddPost />
      </Route>
      <Route path="/users">
        <Users />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Redirect to="/posts" />
    </Switch>
  );
};

export default AppRouter;
