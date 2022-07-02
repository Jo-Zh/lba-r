import { renderer, screen } from "@testing-library/react";
import Link from "../Link";
import App from "./App";

// test("renders home equal 1", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/sign-up/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("render link", () => {
  const component = qrenderer
    .create(<Link page="http://localhost:3000/home">home</Link>)
    .toJSON();
  expect(component).toMatchSnapshot();
});
