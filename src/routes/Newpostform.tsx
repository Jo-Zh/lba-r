import { PostProps } from "../types";
import React, { useState } from "react";
import "./routes.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Newpostform = ({ onSubmitnewPost }: PostProps) => {
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [cover, setCover] = useState<File | null>(null);
	const [category, setCategory] = useState<string>("");

	const formHandler = (e: React.FormEvent) => {
		e.preventDefault();

		const uploadForm = new FormData();
		if (cover) {
			uploadForm.append("cover", cover);
		}
		uploadForm.append("title", title);
		uploadForm.append("content", content);
		uploadForm.append("category", category);

		onSubmitnewPost(uploadForm);

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
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setTitle(e.target.value)
					}
				/>
			</Form.Group>
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

			<Form.Group controlId="formFile" className="mb-3">
				<Form.Label>Image File</Form.Label>
				<Form.Control
					type="file"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						// console.log(e.target.files);
						let file = e.target.files;
						setCover(file ? file[0] : null);
					}}
				/>
			</Form.Group>
			<Form.Select
				aria-label="Default select example"
				onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
					setCategory(e.target.value)
				}
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
