import React from "react";
import { useParams } from "react-router-dom";

const Detail = (props) => {
  let params = useParams();
  const [post] = props.posts.filter((post) => {
    return post.id === parseInt(params.somevalue);
  });
  // const post1 = post[0];
  // console.log(post1);
  return (
    <div>
      <h2 className="blog-post-title">{post.title}</h2>
      <p className="blog-post-meta">
        created on {post.date} by
        {post.creater}
      </p>

      <img
        className="rounded mx-auto d-block"
        src="{post.postcover}"
        alt="Cover"
      />

      <p>{post.content}</p>
    </div>
  );
};

export default Detail;
