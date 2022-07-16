import React from "react";
import { Link } from "react-router-dom";
import Figure from "react-bootstrap/Figure";

const truncate = (input: string) => {
  return input.length > 300 ? `${input.substring(0, 100)}...` : input;
};

const Article = ({
  id,
  posttitle,
  postcontent,
  postcategory,
  postcreater,
  postdate,
  postimage,
}: ArticleProps) => {
  return (
    <div className="col card  box-shadow d-flex flex-row align-items-center border border-light border-3 bg-transparent">
      <div className=" card-body d-flex flex-column align-items-start m-0 h-100">
        <p className="bi bi-tag">{postcategory}</p>
        <blockquote className="blockquote mb-0">
          <p className="fw-bold lead fs-4">
            <a href="{%url 'detail' post.id %}"></a>
            {posttitle}
          </p>
          <footer className="blockquote-footer">
            {postdate.toString()} by {postcreater}
          </footer>
          <p className="lh-sm lead">{truncate(postcontent)}</p>
        </blockquote>
        <Link className="card-link" to={`post/${id}`} key={id}>
          Read more...
        </Link>
      </div>
      <div className="d-flex me-4 align-itecarms-center">
        <Figure>
          <Figure.Image
            width={200}
            height={250}
            alt="Thumbnail [200x250]"
            src={postimage}
          />
        </Figure>
      </div>
    </div>
  );
};
type ArticleProps = {
  id: number;
  posttitle: string;
  postcontent: string;
  postcategory: string;
  postcreater: string;
  postdate: Date;
  postimage?: string;
};

export default Article;
