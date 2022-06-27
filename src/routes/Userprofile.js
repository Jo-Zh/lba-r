import React from "react";
import { NavLink } from "react-router-dom";

const Userprofile = (props) => {
  const myposts = props.posts.filter((item) => item.creater === props.username);

  return (
    <>
      <h1 className="box">This is User profile</h1>
      <NavLink activeClassName="active" to="/addnewpost">
        <h5>New Post</h5>
      </NavLink>
      <hr />
      {myposts.map((item) => {
        return (
          <>
            <hr />
            <NavLink
              activeClassName="active"
              key={item.id}
              to={`/home/post/${item.id}`}
            >
              {item.title} by {item.creater}
            </NavLink>
            <span
              className="nav-link"
              onClick={() => props.deletHandler(item.id)}
            >
              delete
            </span>
          </>
        );
      })}
      <hr />
      <NavLink activeClassName="active" to="#">
        delete User
      </NavLink>
    </>
  );
};

export default Userprofile;
