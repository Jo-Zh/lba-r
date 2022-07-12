import React from "react";
import Article from "./component/Article";
import Search from "./component/Search";
import Category from "./component/Category";

const Home = ({ posts }: HomeProps) => {
  return (
    <div>
      <div className="row text-center py-3">
        <h1>Explore and Sharing learning experience here... </h1>
      </div>
      <div className="d-flex flex-spacebetween bg-light">
        <Search />
        <Category />
      </div>

      <div className="container-fluid px-4 my-4">
        <div className="row g-4 ">
          {posts.map((post) => {
            return (
              <Article
                key={post.id}
                postcategory={post.category}
                postimage={post.cover}
                posttitle={post.title}
                postcreater={post.creater}
                postdate={post.date}
                postcontent={post.content}
                id={post.id}
              />
            );
          })}
          <div className="col">No results</div>
        </div>
      </div>
    </div>
  );
};

type HomeProps = {
  posts: {
    id: number;
    title: string;
    content: string;
    category: string;
    creater: string;
    date: Date;
    cover?: string;
  }[];
};

export default Home;
