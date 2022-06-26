import React from "react";
import { Link } from "react-router-dom";
import Article from "./Article";

const Home = (props) => {
  return (
    <div>
      <div className="row text-center py-3">
        <h1>Explore and Sharing learning experience here... </h1>
      </div>
      <div className="d-flex flex-spacebetween bg-light">
        <form role="search" method="POST" className="form-group bg-light">
          <div className="input-group input-group-sm">
            <input
              type="text"
              name="search"
              className="text-dark my-1"
              placeholder="Search for "
              aria-describedby="inputGroup-sizing-sm"
            />
            <button
              type="submit"
              className="btn btn-outline-warning btn-sm my-1"
            >
              <i className="bi bi-search">IN</i>
            </button>
            <select
              className="rounded my-1 "
              name="field"
              id="floatingSelectGrid"
              defaultValue={"content"}
            >
              <option value="title">title</option>
              <option value="content">content</option>
              <option value="writer">poster</option>
            </select>
          </div>
        </form>

        <div className="dropdown show ">
          <a
            className="btn btn-outline-secondary dropdown-toggle"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="bi bi-funnel">Filter by:</span>
          </a>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a className="dropdown-item" href="{%url 'home'%}">
              ALL
            </a>
            <a className="dropdown-item" href="{{c.get_absolute_url}}">
              {props.cname}
            </a>
          </div>
        </div>
      </div>

      <div className="container-fluid px-4 my-4">
        <div className="row g-4 ">
          {props.posts.map((post) => {
            return (
              <Article
                key={post.id}
                postcategory={post.category}
                posttitle={post.title}
                postcreater={post.creater}
                postdate={post.date}
                postcontent={post.content}
                id={post.id}
              />
            );
          })}
          <div className="col">No results</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
