import React, { useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Posts from "pages/Posts/Posts";
import Users from "pages/Users/Users";
import Login from "pages/Login/Login";
import Signup from "pages/Signup/Signup";
import { Post } from "pages/Post/Post";
import PostEditor from "pages/PostEditor/PostEditor";
import EditPost from "pages/EditPost/EditPost";
import AddPost from "pages/AddPost/AddPost";
import {
  loadItemLocalStorage,
  removeItemLocalStorage,
} from "utilities/localStorage";
import { decodeToken, checkTokenExpired } from "utilities/auth";
import authService from "services/auth.service";

const useInitialAuth = () => {
  const history = useHistory();
  const redirectToLogin = () => {
    history.push("/login");
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = loadItemLocalStorage("accessToken");
    const refreshToken = loadItemLocalStorage("refreshToken");

    const tryRefreshToken = async () => {
      try {
        const {
          data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
        } = await authService.refreshToken(refreshToken);
        dispatch({
          type: "DECODE_AND_SAVE_TOKENS",
          payload: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
        });
      } catch (error) {
        removeItemLocalStorage("accessToken");
        removeItemLocalStorage("refreshToken");
        redirectToLogin();
      }
    };

    console.log("App router render", accessToken, refreshToken);
    if (!accessToken || !refreshToken) {
      return redirectToLogin();
    }
    const tokenExpired = checkTokenExpired(decodeToken(accessToken));
    if (tokenExpired) {
      tryRefreshToken();
    }
  }, []);
};

const AppRouter = () => {
  useInitialAuth();

  return (
    <Switch>
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
