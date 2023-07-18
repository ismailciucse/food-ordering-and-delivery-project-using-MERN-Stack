import React from "react";
import PageHeader from "../common/header/title/PageHeader";
import "./blog.css";
import BlogItem from "./BlogItem";

const Blog = () => {
  return (
    <>
      <PageHeader title="Our Blog" />
      <section className="blog">
        <div className="container">
          <BlogItem />
        </div>
      </section>
    </>
  );
};

export default Blog;
