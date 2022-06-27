import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./routes.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Newpostform = (props) => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  // const [cover, setCover] = useState();
  const [category, setCategory] = useState();

  const formHandler = (e) => {
    e.preventDefault();
    const formdata = {
      title,
      content,
      // cover,
      category,
    };
    console.log(formdata);
    props.onSubmitnewPost(formdata);

    setTitle("");
    setContent("");
    // setCover("");
    setCategory("");
  };

  return (
    <Form onSubmit={formHandler}>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          //   value={username}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Edit Content Here</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      {/* <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Image File</Form.Label>
        <Form.Control type="file" onChange={(e) => setCover(e.target.value)} />
      </Form.Group> */}
      <Form.Select
        aria-label="Default select example"
        onChange={(e) => setCategory(parseInt(e.target.value))}
      >
        <option>Category of articles</option>
        <option value="1">Code-learning</option>
        <option value="2" disabled>
          Two
        </option>
        <option value="3" disabled>
          Three
        </option>
      </Form.Select>

      <Button variant="primary" type="submit">
        Post
      </Button>
    </Form>
  );
};

export default Newpostform;
