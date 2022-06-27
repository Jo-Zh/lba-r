import React, { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
// import { useNavigate } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import useAxios from "./utils/useAxios";

const Base = lazy(() => import("./routes/Base"));
const Home = lazy(() => import("./routes/Home"));
const Detail = lazy(() => import("./routes/Detail"));
const Userprofile = lazy(() => import("./routes/Userprofile"));
const Signupform = lazy(() => import("./routes/Signupform"));
const Loginform = lazy(() => import("./routes/Loginform"));
const Newpostform = lazy(() => import("./routes/Newpostform"));

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
  const [user, setUser] = useState();
  const [logged_in, setLogged_in] = useState(
    localStorage.getItem("token") ? true : false
  );
  // const api = useAxios();
  // const navigate = useNavigate();
  useEffect(() => {
    if (logged_in) {
      setUser(jwt_decode(localStorage.getItem("token")));
    }
    axios
      .get("http://127.0.0.1:8000/posts/")
      .then(function (response) {
        // handle success
        setPosts(response.data.results);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const addUserform = (formdata) => {
    const { username, email, password, passwordrepeat } = formdata;
    axios
      .post("http://127.0.0.1:8000/register/", {
        username: username,
        email: email,
        password: password,
        password2: passwordrepeat,
      })
      .then((response) => {
        // let token = response.data.access;
        // localStorage.setItem("token", "Bearer " + token);
        // setLogged_in(true);
        // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        console.log(response.data);
        // navigate.push("/home");
      })

      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const loginform = (formdata) => {
    const { username, password } = formdata;
    axios
      .post("http://127.0.0.1:8000/token/", {
        username: username,
        password: password,
      })
      .then((response) => {
        let token = response.data.access;
        localStorage.setItem("token", "Bearer " + token);
        setLogged_in(true);
        console.log(typeof response.data.access);
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const addnewpostform = (formdata) => {
    const token = localStorage.getItem("token");
    // console.log(token);
    const { title, content, category } = formdata;
    axios
      .post(
        "http://127.0.0.1:8000/posts/",
        {
          title,
          content,
          // cover,
          category,
        },
        { headers: { Authorization: token } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setLogged_in(false);
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
                logoutHandler={logoutHandler}
              />
            }
          >
            <Route
              path="home"
              element={<Home posts={posts} cname={"cname"} />}
            ></Route>
            <Route
              path="home/post/:somevalue"
              element={<Detail posts={posts} />}
            />
            <Route
              path="/addnewpost"
              element={<Newpostform onSubmitnewPost={addnewpostform} />}
            />

            <Route path="user/id" element={<Userprofile />} />
            <Route
              path="sign-up"
              element={<Signupform onSubmitSignup={addUserform} />}
            />
            <Route
              path="log-in"
              element={<Loginform onSubmitLogin={loginform} />}
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
export default App;
