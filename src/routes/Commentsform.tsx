import React, { useState } from "react";
import { CommentProps, Comment_data } from "../types";
import "./routes.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Commentsform = ({ onSubmitComment }: CommentProps) => {
	const [content, setContent] = useState("");

	const formHandler = (e: React.FormEvent) => {
		e.preventDefault();
		const formdata: Comment_data = {
			content,
		};

		onSubmitComment(formdata);

		setContent("");
	};

	return (
		<Form onSubmit={formHandler}>
			<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
				<Form.Label>Edit Content Here</Form.Label>
				<Form.Control
					as="textarea"
					rows={3}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setContent(e.target.value)
					}
				/>
			</Form.Group>

			<Button variant="primary" type="submit">
				Post
			</Button>
		</Form>
	);
};

export default Commentsform;
