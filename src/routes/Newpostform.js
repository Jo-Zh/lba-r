import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./routes.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Newpostform = (props) => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [cover, setCover] = useState(null);
  const [category, setCategory] = useState();

  const formHandler = (e) => {
    e.preventDefault();

    const uploadForm = new FormData();
    if (cover) {
      uploadForm.append("cover", cover);
    }
    uploadForm.append("title", title);
    uploadForm.append("content", content);
    uploadForm.append("category", category);

    props.onSubmitnewPost(uploadForm);

    setTitle("");
    setContent("");
    setCover(null);
    setCategory("");
  };

  return (
    <Form onSubmit={formHandler}>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Title"
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

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Image File</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => {
            console.log(e.target.files);
            setCover(e.target.files[0] ? e.target.files[0] : null);
          }}
        />
      </Form.Group>
      <Form.Select
        aria-label="Default select example"
        onChange={(e) => setCategory(parseInt(e.target.value))}
      >
        <option>Category of articles</option>
        <option value="1">Code-learning</option>
        <option value="2">5minsread-coding</option>
        <option value="3">meditation</option>
      </Form.Select>

      <Button variant="primary" type="submit">
        Post
      </Button>
    </Form>
  );
};

export default Newpostform;
