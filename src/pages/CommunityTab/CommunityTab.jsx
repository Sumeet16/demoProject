import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CommunityTab = () => {
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

    const intiateCourseFetch = async () => {
        const myLearningArray = localStorage.getItem("userData").split(",")
        console.log(myLearningArray);
        myLearningArray.forEach((elem) => {
            getCourse(elem)
        })
    }

    const getUser = async () => {
        const userId = localStorage.getItem("userId")

        const response = await axios.post("http://localhost:8080/getUser", {
            userId
        })
        setUser(response.data.user);
    }

    useEffect(() => {
        const access = localStorage.getItem("token");
        if (!access) {
            navigate("/loguser", { replace: true })
        }
        getUser()
        intiateCourseFetch()
    }, [])

    return (
        <>
            <Header color="black" />
            <div className="community_cont">
                <div className="chat_room_cont">
                    <div className="demoBox">
                        {
                            courses.map((elem, index) => {
                                return (
                                    <div className="courseCard">
                                        <img src={elem.courseImage} className="imageCard" alt="" srcset="" />
                                        <h2>{elem.title}</h2>
                                        <a className="button" onClick={() => { navigate(`/chat?id=${elem.title.replaceAll(' ', '')}`, { replace: true }); window.scrollTo(top) }}>Click Here</a>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CommunityTab