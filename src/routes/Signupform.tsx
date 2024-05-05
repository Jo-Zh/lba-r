import { Form_data, SignupformProps } from "../types";
import React, { useState } from "react";
import "./routes.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

const Signupform = ({ onSubmitSignup }: SignupformProps) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	// const [avatar, setAvatar] = useState(null);
	const [passwordValidate, setPasswordValidate] = useState<boolean>(true);
	const [poster_or_reader, setPoster_or_reade] = useState("poster");

	const navigate = useNavigate();
	// let passwordValidate: string = "";
	const formHandler = (e: React.FormEvent) => {
		e.preventDefault();

		const formdata: Form_data = {
			username,
			password,
			password2,
			email,
			is_poster: poster_or_reader === "poster" ? true : false,
			is_reader: poster_or_reader === "reader" ? true : false,
		};

		onSubmitSignup(formdata);

		setUsername("");
		setEmail("");
		setPassword("");
		setPassword2("");

		if (password !== "") {
			navigate("/home", { replace: true });
			setPasswordValidate(true);
		} else {
			setPasswordValidate(false);
		}
	};

	return (
		<Form id="form" onSubmit={formHandler}>
			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label>Username</Form.Label>
				<Form.Control
					type="text"
					placeholder="Username"
					// name="username"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setUsername(e.target.value)
					}
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter email"
					// name="email"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setEmail(e.target.value)
					}
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
					// name="password"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{6,10}$/;
						if (regex.test(e.target.value)) {
							console.log(passwordValidate);
							// setPasswordValidate("Validated!");
							return setPassword(e.target.value);
						} else {
							console.log(passwordValidate);
							// setPasswordValidate("Invalide");
							return setPassword("");
						}
					}}
				/>
			</Form.Group>

			<p className={!passwordValidate ? "text-danger" : "text-success"}>
				Password (as least 1 digit, at least 1 uppercase letter, at least 1
				lowercase letter, between 6-10 characters)
			</p>

			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label>Password repeat</Form.Label>
				<Form.Control
					type="password"
					placeholder="Password Repeat"
					// name="password2"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setPassword2(e.target.value)
					}
				/>
			</Form.Group>
			<DropdownButton id="poster-reader" title="Dropdown button">
				<Dropdown.Item
					onClick={() => {
						setPoster_or_reade("poster");
					}}
				>
					Poster
				</Dropdown.Item>
				<Dropdown.Item
					onClick={() => {
						setPoster_or_reade("reader");
					}}
				>
					Reader
				</Dropdown.Item>
			</DropdownButton>
			<br />

			{/* <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>avatar img</Form.Label>
        <Form.Control
          type="file"
          // name="avatar"
          onChange={(e) => {
            console.log(e.target.files);
            setAvatar(e.target.files[0] ? e.target.files[0] : null);
          }}
        />
      </Form.Group> */}

			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};

export default Signupform;
