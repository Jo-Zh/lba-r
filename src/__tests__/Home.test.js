import Search from "../routes/component/Search";
import React from "react";
import Home from "../routes/Home";
import { BrowserRouter as Router } from "react-router-dom";
import TestRenderer from "react-test-renderer";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders correctly", () => {
  const tree = TestRenderer.create(<Search />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders with or without a name", () => {
  act(() => {
    const posts = [
      {
        id: 1,
        title: "example",
        content: "something here",
        category: "code-learning",
        cover: null,
      },
      {
        id: 2,
        title: "example",
        content: "something here",
        category: "code-learning",
        cover: null,
      },
    ];

    render(
      <Router>
        <Home posts={posts} />
      </Router>,
      container
    );
  });

  expect(container.querySelectorAll("#test-article").length).toEqual(2);
});
