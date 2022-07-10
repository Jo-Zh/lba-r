import React from "react";
import App from "../App";
import TestRenderer from "react-test-renderer";

test("renders without crashing", () => {
  const app = document.createElement("Router");
  const testRenderer = TestRenderer.create(<App />, app);
  console.log(testRenderer.toJSON());
});
