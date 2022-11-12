import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePageBlogSection.css"

const HomePageBlogSection = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {

        const getBlogs = async () => {
            const res = await axios("http://localhost:8080/getBlogs", {
                method: "GET",
            });
            setBlogs(res.data.blogs);
        };

        getBlogs();
    }, []);

    console.log("tisisdata", blogs);

    return (
        <>
            <section class="course-area grey-bg pb-70 pt-100" id='course'>
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12 text-center mb-40">
                            <div class="section-title service-title">
                                <h2 className='title'>Recent Blogs</h2>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,words which don't look even slightly believable.</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        {
                            [...blogs]
                            .reverse()
                            .slice(0, 5)
                            .reverse()
                            .map((elem, index) => {
                                return (
                                    <>
                                        <div className="blog_row">
                                            <img src={elem.image} alt="blogsImage" />
                                            <p className="date">8 April 2022</p>
                                            <h4 className="blogTitle">{elem.title}</h4>
                                            <a href="#">Read More</a>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                <a href="/blogs" className="viewMoreBTN">Read More</a>
            </section>
        </>
    )
}

export default HomePageBlogSection