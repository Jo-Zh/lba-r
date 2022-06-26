import React, { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
// const Axios = require("axios");

const Base = lazy(() => import("./routes/Base"));
const Home = lazy(() => import("./routes/Home"));
const Detail = lazy(() => import("./routes/Detail"));
const Userprofile = lazy(() => import("./routes/Userprofile"));

const dummyUser = [
  {
    id: 1,
    username: "dummy",
    email: "test@test.com",
  },
];

const dummyPosts = [
  {
    id: 1,
    posttitle: "Learn-React",
    slug: "Learn-React",
    postcontent: "this is my first post",
    postcreater: "Jo",
    postdate: "01-05-2022",
    postcategory: "learn-coding",
    postcover: "None",
    add_like: 0,
  },
  {
    id: 2,
    posttitle: "Learn-React2",
    slug: "Learn-React2",
    postcontent: "this is my second post",
    postcreater: "Jo",
    postdate: "01-05-2022",
    postcategory: "learn-coding",
    postcover: "None",
    add_like: 0,
  },
];

const App = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/posts/")
      .then(function (response) {
        // handle success
        setPosts(response.data.results);
        console.log(response.data.results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Base />}>
            <Route
              path="home"
              element={<Home posts={posts} cname={"cname"} />}
            ></Route>
            <Route
              path="home/post/:somevalue"
              element={<Detail posts={posts} />}
            />
            <Route path="user/id" element={<Userprofile />} />
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
export default App;
