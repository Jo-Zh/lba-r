import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function useAxios() {
  const [posts, setPosts] = useState([]);
  const [user_data, setUser_data] = useState(
    localStorage.getItem("user_data")
      ? JSON.parse(localStorage.getItem("user_data"))
      : null
  );

  const [logged_in, setLogged_in] = useState(
    localStorage.getItem("token") ? true : false
  );
  useEffect(() => {
    getPosts();
  }, [setPosts]);

  const getPosts = () => {
    axios
      .get("http://127.0.0.1:8000/posts/")
      .then(function (response) {
        // handle success
        setPosts(response.data.results);
        // console.log(response.data.results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const userDetail = (id) => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://127.0.0.1:8000/users/${id}`, {
        headers: { Authorization: token },
      })
      .then(function (res) {
        // setUser(res.data);
        localStorage.setItem("is_poster", res.data.is_poster);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addUserform = (formdata) => {
    const { username, email, password, passwordrepeat, is_poster, is_reader } =
      formdata;
    axios
      .post("http://127.0.0.1:8000/register/", {
        username,
        email,
        password: password,
        password2: passwordrepeat,
        is_poster,
        is_reader,
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
        console.log(response.data);
        let token = response.data.access;
        let user_data = JSON.stringify(jwt_decode(response.data.access));
        localStorage.setItem("token", "Bearer " + token);
        localStorage.setItem("user_data", user_data);
        setLogged_in(true);
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        setUser_data(jwt_decode(response.data.access));
      })
      .then((response) => {
        userDetail(user_data.user_id);
      })

      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const logoutHandler = () => {
    localStorage.removeItem("user_data");
    localStorage.removeItem("token");
    setLogged_in(false);
  };

  const addnewpostform = (formdata) => {
    const token = localStorage.getItem("token");
    axios
      .post("http://127.0.0.1:8000/posts/", formdata, {
        headers: {
          Authorization: token,
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        setPosts((prev) => {
          console.log(response.data);
          return [...prev, response.data];
        });
      })
      .then(getPosts())
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const deleteHandler = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://127.0.0.1:8000/posts/${id}`, {
        headers: { Authorization: token },
      })
      .then(() => {
        setPosts(
          posts.filter((item) => {
            return item._id !== id;
          })
        );
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const deleteUserHandler = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://127.0.0.1:8000/users/${id}`, {
        headers: { Authorization: token },
      })
      .then(() => {
        setLogged_in(false);
        setUser_data(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user_data");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return {
    posts,
    user_data,
    logged_in,
    getPosts,
    deleteHandler,
    addnewpostform,
    logoutHandler,
    loginform,
    addUserform,
    userDetail,
    deleteUserHandler,
  };
}
