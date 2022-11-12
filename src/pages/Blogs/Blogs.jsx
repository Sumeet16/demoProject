import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./Blogs.css";
import bannerImg from "../../assets/img/bg/page-title.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Banner from "../../components/Banner/Banner";
import BlogCard from "../../components/BlogCard/BlogCard";
import { RotatingSquare } from "react-loader-spinner";
import Footer from "../../components/Footer/Footer";
import RecentBlogCard from "../../components/RecentBlogCard/RecentBlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [read, setRead] = useState(3);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);

    const getBlogs = async () => {
      const res = await axios("http://localhost:8080/getBlogs", {
        method: "GET",
      });
      setBlogs(res.data.blogs);
      setLoading(false);
    };

    getBlogs();

    const fetchTags = async () => {
      const arr = [];
      blogs.map((blog) => {
        blog.tags.map((tag) => {
          console.log(tag);
        });
      });
      console.log([...arr]);
    };

    fetchTags();
  }, []);

  return (
    <>
      <Header color="black" />
      <Banner bannerImg={bannerImg} title="BLOG" component="Home/Pages/Blogs" />
      <div className="blog-section-wrapper">
        {!loading && (
          <div className="blog-section">
            {blogs.map((blog) => {
              return <BlogCard blog={blog} key={blog._id} />;
            })}
          </div>
        )}
        {loading && (
          <div className="spin-wrapper">
            <RotatingSquare
              height="100"
              width="100"
              color="#fd7e14"
              ariaLabel="rotating-square-loading"
              strokeWidth="4"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
        <div className="tag-section">
          {!loading && (
            <div className="recents">
              <h4>Recent Blogs</h4>
              <div className="recent-blogs-wrapper">
                {[...blogs]
                  .reverse()
                  .slice(0, read)
                  .reverse()
                  .map((blog) => {
                    return (
                      <RecentBlogCard blog={blog} />
                    );
                })}
                <p
                  className="read-more"
                  onClick={() => {
                    if (read != blogs.length) {
                      setRead(read + 2);
                    }
                  }}
                >
                  Read more
                </p>
              </div>
            </div>
          )}
          <div className="tags">{ }</div>
        </div>
      </div>
      <footer><Footer /></footer>
    </>
  );
};

export default Blogs;
