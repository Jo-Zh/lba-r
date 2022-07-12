import React, { ReactComponentElement, ReactElement } from "react";
import App from "../App";
import TestRenderer from "react-test-renderer";

test("renders without crashing", () => {
  // const app = document.createElement("Router") as ;
  const testRenderer = TestRenderer.create(<App />);
  console.log(testRenderer.toJSON());
});
