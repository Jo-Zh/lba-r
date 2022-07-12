import React from "react";
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
type DetailProps = {
  posts: {
    id: number;
    title: string;
    content: string;
    category: string;
    creater: string;
    date: Date;
    cover?: String;
  }[];

  deletHandler: (x: number) => void;
};
export default Detail;
