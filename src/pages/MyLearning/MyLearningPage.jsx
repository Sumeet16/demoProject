import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./MyLearning.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bannerImg from "../../assets/img/bg/page-title.jpg";
import Banner from "../../components/Banner/Banner";

const MyLearning = () => {
    const [user, setUser] = useState([]);
    const [courses, setCourse] = useState([]);
    const navigate = useNavigate();


    const getCourse = async (elem) => {
        const id = elem
        const response = await axios.post("http://localhost:8080/getCourseById", {
            id
        })
        setCourse(courses => [...courses, response.data.course])
    }

    const getUser = async () => {
        const userId = localStorage.getItem("userId")

        const response = await axios.post("http://localhost:8080/getUser", {
            userId
        })
        setUser(response.data.user);

        const newArray = response.data.user.myLearning
        newArray.forEach((elem) => {
            getCourse(elem)
        })
    }

    useEffect(() => {
        const access = localStorage.getItem("token");
        if (!access) {
            navigate("/loguser", { replace: true })
        }
        getUser()
    }, [])

    return (
        <>
            <Header color="black" />
            <Banner bannerImg={bannerImg} title="MY LEARNING" component="Home/Pages/MyLearning" />
            <div className="MyLearning_container">
                <div class="row">
                    {courses.length > 0 ? <>
                        {
                            courses.map((elem, index) => {
                                return (
                                    <div className="course_card" key={index}>
                                        <img src={elem.courseImage} className="image image_card" alt="image" />
                                        <h2>{elem.title}</h2>
                                        <a className="button" onClick={() => { navigate(`/mycourse?id=${elem._id}`, { replace: true }); window.scrollTo(top) }}>Go To Course</a>
                                    </div>
                                )
                            })
                        }
                    </> : <><h1>Nothing In My Learning</h1> <a href="courses" class="btn">View Courses</a></>}
                </div>

            </div>
            <Footer />
        </>
    )
}

export default MyLearning