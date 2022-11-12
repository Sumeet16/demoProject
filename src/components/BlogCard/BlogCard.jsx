import React from "react";
import './BlogCard.css'
const BlogCard = ({blog}) => {
  return (
      <div className="blog-wrapper" key={blog._id}>
        <img src={blog.image} alt="" className="blog-show-img" />
        <h1><a href={`/blog/${blog.slug}`} style={{textDecoration: "none", color: "black"}}>{blog.title}</a></h1>
        <p>{blog.description}</p>
        <p style={{fontStyle: "italic"}}>{blog.tags}</p>
        <button>Read More</button>
      </div>
  );
};

export default BlogCard;
