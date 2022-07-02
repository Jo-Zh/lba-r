import React from "react";
import { NavLink } from "react-router-dom";

const Userprofile = (props) => {
  const user_id = props.user_data.user_id;
  const user = props.user_data.username;
  const myposts = props.posts.filter((item) => item.creater === user);
  return (
    <>
      <h1 className="box">This is {user}'s profile</h1>
      {localStorage.getItem("is_poster") === "true" ? (
        <NavLink to="/addnewpost">
          <h5>New Post</h5>
        </NavLink>
      ) : null}
      <hr />
      {myposts.map((item) => {
        return (
          <div key={item.id}>
            <hr />
            <NavLink to={`/home/post/${item.id}`}>
              {item.title} on {item.date}
            </NavLink>
            <span
              className="nav-link"
              onClick={() => props.deletHandler(item.id)}
            >
              delete
            </span>
          </div>
        );
      })}
      <hr />
      <NavLink
        to="/home"
        onClick={() => {
          props.deletUserHandler(user_id);
          console.log(user_id);
        }}
      >
        delete User
      </NavLink>
    </>
  );
};

export default Userprofile;
