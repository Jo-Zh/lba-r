import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./routes.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Commentsform = (props) => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const formHandler = (e) => {
    e.preventDefault();
    const formdata = {
      title,
      content,
    };
    console.log(formdata);
    props.onSubmitnewPost(formdata);

    setTitle("");
    setContent("");
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

      <Button variant="primary" type="submit">
        Post
      </Button>
    </Form>
  );
};

export default Commentsform;
