import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./routes.css";

const Base = (props) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          {props.is_authenticated ? (
            <div className="dropdown show my-2">
              <a
                className="navbar-brand dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                User
              </a>

              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenuLink"
              >
                <Link className="dropdown-item" to="/user/id">
                  User Dashboard
                </Link>
                <Link className="dropdown-item disabled" to="/">
                  Messages
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/">
                  Password Reset
                </Link>
              </div>
            </div>
          ) : null}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" aria-current="page" to="/home">
                Home
              </Link>
              {props.is_authenticated ? (
                <Link
                  className="nav-link active"
                  to="/"
                  onClick={props.logoutHandler}
                >
                  <span className="navbar-text">Logged in </span>
                  Log Out
                </Link>
              ) : (
                <Link className="nav-link active" to="/log-in">
                  Log In
                </Link>
              )}
              <p>
                <Link className="nav-link active" type="button" to="/sign-up">
                  Sign-up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </nav>
      <Outlet></Outlet>
    </>
  );
};

export default Base;
