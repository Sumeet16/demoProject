import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from '../../components/Header/Header'
import bannerImg from "../../assets/img/bg/page-title.jpg";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import "./AllCoursePage.css"

const AllCoursePage = () => {
    const navigate = useNavigate();
    const [course, setCourse] = useState([]);

    useEffect(() => {
        const getCourse = async () => {
            const res = await axios("http://localhost:8080/getCourse", {
                method: "GET",
            });
            setCourse(res.data.course);
        };

        getCourse();
        const getUser = async () => {
            const userId = localStorage.getItem("userId")

            const response = await axios.post("http://localhost:8080/getUser", {
                userId
            })
            localStorage.setItem("userData", response.data.user.myLearning);
        }
        getUser()
    }, []);

    return (
        <>
            <Header color="black" />
            <div className="mainCourseContainer">
                <Banner bannerImg={bannerImg} title="COURSES" component="Home/Pages/Courses" />
                <div className="demoBox">
                    {
                        course.map((elem, index) => {
                            return (
                                <div className="courseCard">
                                    <img src={elem.courseImage} className="imageCard" alt="" srcset="" />
                                    <h2>{elem.title}</h2>
                                    <p className="course_disc">{elem.description}</p>
                                    <a className="button" onClick={() => { navigate(`/course?id=${elem._id}`, { replace: true }); window.scrollTo(top) }}>View Course</a>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AllCoursePage