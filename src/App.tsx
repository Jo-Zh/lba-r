import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import useAxios from "./utils/useAxios";

const Base = lazy(() => import("./routes/Base"));
const Home = lazy(() => import("./routes/Home"));
const Detail = lazy(() => import("./routes/Detail"));
const Userprofile = lazy(() => import("./routes/Userprofile"));
const Signupform = lazy(() => import("./routes/Signupform"));
const Loginform = lazy(() => import("./routes/Loginform"));
const Newpostform = lazy(() => import("./routes/Newpostform"));

const App = () => {
  const {
    posts,
    user_data,
    logged_in,
    deleteHandler,
    addnewpostform,
    logoutHandler,
    loginform,
    addUserform,
    userDetail,
    deleteUserHandler,
  } = useAxios();

  const onAddUserform = (formdata: form_data) => {
    addUserform(formdata);
  };

  const onLoginform = (formdata: any) => {
    loginform(formdata);
  };

  const onGetUser = () => {
    console.log(user_data);
    let id = user_data.user_id;
    try {
      userDetail(id);
    } catch (error) {
      console.log("error");
    }
  };
  const onLogoutHandler = () => {
    logoutHandler();
  };

  const onAddnewpostform = (formdata: any) => {
    addnewpostform(formdata);
  };

  const onDeleteHandler = (id: number) => {
    deleteHandler(id);
  };

  const onDeleteUserHandler = (id: number) => {
    deleteUserHandler(id);
  };

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <Base
                is_authenticated={logged_in}
                logoutHandler={onLogoutHandler}
                user={user_data ? user_data.username : "visitor"}
                getUserHandler={onGetUser}
              />
            }
          >
            <Route path="home" element={<Home posts={posts} />}></Route>
            <Route
              path="home/post/:somevalue"
              element={<Detail posts={posts} deletHandler={onDeleteHandler} />}
            />
            <Route
              path="/addnewpost"
              element={<Newpostform onSubmitnewPost={onAddnewpostform} />}
            />

            <Route
              path="user/:username"
              element={
                <Userprofile
                  posts={posts}
                  deletHandler={onDeleteHandler}
                  deletUserHandler={onDeleteUserHandler}
                  user_data={user_data}
                />
              }
            />
            <Route
              path="sign-up"
              element={<Signupform onSubmitSignup={onAddUserform} />}
            />
            <Route
              path="log-in"
              element={<Loginform onSubmitLogin={onLoginform} />}
            />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

interface form_data {
  username: string;
  password?: string;
  password2?: string;
  email: string;
  is_poster: boolean;
  is_reader: boolean;
}

export default App;
