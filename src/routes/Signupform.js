import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./routes.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Signupform = (props) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordrepeat, setPasswordrepeat] = useState();

  const navigate = useNavigate();
  //   const [avatar, setAvatar] = useState();
  //   const [is_poster, setIs_poster] = useState(false);
  //   const [is_reader, setIs_reader] = useState(false);

  const formHandler = (e) => {
    e.preventDefault();
    const formdata = {
      username,
      password,
      passwordrepeat,
      email,
    };
    console.log(formdata);
    props.onSubmitSignup(formdata);

    setUsername("");
    setEmail("");

    setPassword("");
    setPasswordrepeat("");

    navigate("/home", { replace: true });
    // setAvatar("");
    // setIs_poster(false);
    // setIs_reader(false);
  };

  return (
    <Form onSubmit={formHandler}>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          //   value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          //   value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          //   value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password repeat</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password Repeat"
          //   value={passwordrepeat}
          onChange={(e) => setPasswordrepeat(e.target.value)}
        />
      </Form.Group>

      {/* <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>avatar img</Form.Label>
        <Form.Control type="file" onChange={(e) => setAvatar(e.target.value)} />
      </Form.Group>

      <div key="inline-radio" className="mb-3">
        <Form.Check
          inline
          label="as poster"
          name="poster-reader"
          type="radio"
          //   value={true}
          id="inline-radio-1"
          onChange={(e) => setIs_poster(e.target.value === "on")}
        />
        <Form.Check
          inline
          label="as reader"
          name="poster-reader"
          type="radio"
          //   value={true}
          id="inline-radio-2"
          onChange={(e) => setIs_reader(e.target.value === "on")}
        />
      </div> */}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Signupform;
