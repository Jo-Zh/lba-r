import { ArticleProps } from "../../types";
import { Link } from "react-router-dom";
import Figure from "react-bootstrap/Figure";

const truncate = (input: string) => {
	return input.length > 300 ? `${input.substring(0, 100)}...` : input;
};

const Article = (props: ArticleProps) => {
	return (
		<div className="col card  box-shadow d-flex flex-row align-items-center border border-light border-3 bg-transparent">
			<div className=" card-body d-flex flex-column align-items-start m-0 h-100">
				<p className="bi bi-tag">{props.postcategory}</p>
				<blockquote className="blockquote mb-0">
					<p className="fw-bold lead fs-4">
						<a href="{%url 'detail' post.id %}"></a>
						{props.posttitle}
					</p>
					<footer className="blockquote-footer">
						{props.postdate.toString()} by {props.postcreater}
					</footer>
					<p className="lh-sm lead">{truncate(props.postcontent)}</p>
				</blockquote>
				<Link className="card-link" to={`post/${props.id}`} key={props.id}>
					Read more...
				</Link>
			</div>
			<div className="d-flex me-4 align-itecarms-center">
				<Figure>
					<Figure.Image
						width={200}
						height={250}
						alt="Thumbnail [200x250]"
						src={props.postimage}
					/>
				</Figure>
			</div>
		</div>
	);
};

export default Article;
