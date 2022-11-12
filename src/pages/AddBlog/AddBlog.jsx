import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import slugify from "slugify";
import "react-toastify/dist/ReactToastify.css";
import './AddBlog.css'
const AddBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlogSchema, setNewBlogSchema] = useState({
    image: "",
    title: "",
    description: "",
    tags: [],
    likes: 0,
  });

  const handleChange = (event) => {
    setNewBlogSchema({
      ...newBlogSchema,
      [event.target.name]: event.target.value,
    });
  };

  const getBlogs = async () => {
    const res = await axios("http://localhost:8080/getBlogs");

    console.log(res.data.blogs);
    setBlogs(res.data.blogs);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const deleteBlog = async (e) => {
    const title = e.target.className
    const res = await fetch("http://localhost:8080/deleteBlog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title
      }),
    });

    if (res.status == 200) {
      toast.success("Blog Deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { image, description, title, tags, likes } = newBlogSchema;
    const slugifiedTitle = slugify(title, {
      lower: true
    })
    // console.log(slugifiedTitle)

    const res = await fetch("http://localhost:8080/addBlogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image,
        description,
        title,
        tags,
        likes,
        slugifiedTitle
      }),
    });

    const result = await res.json();
    const statusCode = res.status;
    getBlogs();

    if (statusCode === 422 || !result) {
      toast.error("Blog Not Added !!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (statusCode == 409) {
      toast.error("Same Blog Exists", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (statusCode == 401) {
      toast.error("Unauthorized", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (statusCode == 200) {
      toast.success("Blog Added", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const getImgURL = (ev) => {
    const formdata = new FormData();
    formdata.append("image", ev.target.files[0]);
    fetch("https://api.imgur.com/3/image", {
      method: "post",
      headers: {
        Authorization: "Client-ID 1e4107b48d3e3b7",
      },
      body: formdata,
    })
      .then((data) => data.json())
      .then((data) => {
        setNewBlogSchema({ ...newBlogSchema, image: data.data.link });
      });
  };

  return (
    <>
      <div className="addBlogMainContain">
        <ToastContainer />
        <form
          method="post"
          onSubmit={(event) => handleSubmit(event)}
          className="input-holder-addblog"
        >
          <h2>Add a New Blog</h2>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Blog Title"
            onChange={(event) => handleChange(event)}
          />
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Blog Description"
            onChange={(event) => handleChange(event)}
          />
          <input
            type="text"
            name="tags"
            id="tags"
            placeholder="Comma Seprated Tags"
            onChange={(event) => {
              const arr = event.target.value.split(",");
              if (arr.length < 4) {
                setNewBlogSchema({ ...newBlogSchema, tags: arr });
              } else {
                toast.error("You can only add 3 tags !!!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                arr.length = 3;
                setNewBlogSchema({ ...newBlogSchema, tags: arr });
              }
            }}
          />

          <input
            type="file"
            name="file"
            id="file"
            onChange={(ev) => getImgURL(ev)}
          />
          <p>{newBlogSchema.image}</p>
          {
            newBlogSchema.image !== "" && (
              <div className="preview-image">
                <img
                  src={newBlogSchema.image}
                  alt="loading..."
                  className="prev-img"
                />
              </div>
            )
          }
          <button type="submit" className="submit-btn">
            Add Blog
          </button>
        </form>
      </div>
      <h1 style={{marginInlineStart: "4rem", marginBlock: "3rem"}}>Recent Blog</h1>
      <div className="blog-wrapper-addBlog">
        {blogs.map((elem, index) => {
          return (
            <div className="addedBlog" key={index}>
              <div className="addBlogImage">
                <img src={elem.image} alt="image" />
              </div>
              <p className="addedBlogTitle">{elem.title}</p>
              <p className="addedBlogDesc">{elem.description}</p>
              <div className="blogTags">
                {elem.tags.map((tag, index) => {
                  return (
                    <div className="tagName" key={index}>{tag}</div>
                  )
                })}
              </div>
              <button className={elem.title} onClick={(e) => { deleteBlog(e) }}>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AddBlog;

// Add blog - blog image, desc, title, tags
