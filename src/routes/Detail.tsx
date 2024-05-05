import { DetailProps } from "../types";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Detail = ({ posts, deletHandler }: DetailProps) => {
	const { somevalue } = useParams<{ somevalue?: string }>();

	const [post] = posts.filter((post) => {
		return post.id.toString() === somevalue;
	});

	return (
		<div>
			<h2 className="blog-post-title">{post.title}</h2>
			<p className="blog-post-meta">
				created on {post.date.toString()} by
				{post.creater}
			</p>
			<img
				className="rounded mx-auto d-block"
				src="{post.postcover}"
				alt="Cover"
			/>

			<p>{post.content}</p>

			<Button type="button" onClick={() => deletHandler(post.id)}>
				Delete
			</Button>
		</div>
	);
};

export default Detail;
