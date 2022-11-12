import React from "react";
import "./RecentBlogCard.css";
const RecentBlogCard = ({blog}) => {
  return (
      <div className="blog-recent" key={blog._id}>
        <img src={blog.image} alt="" className="blog-recent-img" />
        <p><a href={`/blog/${blog.slug}`} style={{textDecoration: "none", color: "black"}}>{blog.title}</a></p>
      </div>
  );
};

export default RecentBlogCard;
