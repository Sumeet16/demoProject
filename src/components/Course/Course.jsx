import React, { useEffect, useState } from 'react'
import "./Course.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import image from "../../assets/img/features/01.jpg"

const Course = () => {
    const navigate = useNavigate();
    const [course, setCourse] = useState([]);
    const getCourse = async () => {
        const res = await axios("http://localhost:8080/getCourse", {
            method: "GET",
        });
        setCourse(res.data.course);
    };

    useEffect(() => {
        getCourse();
    }, []);

    return (
        <>
            <section class="course-area grey-bg pb-70 pt-100" id='course'>
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12 text-center mb-40">
                            <div class="section-title service-title">
                                <h2 className='title'>Our Courses</h2>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,words which don't look even slightly believable.</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        {
                            course.map((elem, index) => {
                                return (
                                    <div className="course_card">
                                        <img src={elem.courseImage} className="image image_card" alt="" srcset="" />
                                        <h2>{elem.title}</h2>
                                        <p className="course_disc">{elem.description}</p>
                                        <a className="button" onClick={() => {navigate(`/course?id=${elem._id}`, { replace: true }); window.scrollTo(top)}}>View Course</a>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
                <a href="#" className="viewMoreBTN">View More</a>
            </section>
        </>
    )
}

export default Course