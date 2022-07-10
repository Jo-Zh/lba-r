import React from "react";
import { Link } from "react-router-dom";
import Figure from "react-bootstrap/Figure";

const truncate = (input) => {
  try {
    return input.length > 300 ? `${input.substring(0, 100)}...` : input;
  } catch (error) {
    return { error };
  }
};

const Article = (props) => {
  return (
    <div id="test-article" className="col-md-4">
      <div className="card box-shadow d-flex flex-row p-0 align-items-center h-100">
        <div className=" card-body d-flex flex-column align-items-start m-0 h-100">
          <p className="bi bi-tag">{props.postcategory}</p>
          <blockquote className="blockquote mb-0">
            <p className="fw-bold lead fs-4">
              <a href="{%url 'detail' post.id %}"></a>
              {props.posttitle}
            </p>
            <footer className="blockquote-footer">
              {props.postdate} by {props.postcreater}
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
    </div>
  );
};

export default Article;