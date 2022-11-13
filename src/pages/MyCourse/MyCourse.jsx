import React, { useEffect, useState } from 'react'
import "./MyCourse.css"
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const MyCourse = () => {
    const navigate = useNavigate();
    const [courseInfo, setCourseInfo] = useState([]);
    const [video, setvideo] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');

    useEffect(() => {
        const getCourseById = async (id) => {
            const res = await fetch("http://localhost:8080/getCourseById", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id
                })
            })

            const result = await res.json();
            const data = result.course;
            setCourseInfo(data)
            setvideo(data.videos)
        }
        getCourseById(myParam)
    }, []);

    console.log(video);


    return (
        <>
            <Header color="black" />
            <div className="myCourse_container">
                <h2>{courseInfo.title}</h2>
                <div className="myCourse_dummy_cont">
                    {
                        video.map((elem, index) => {
                            return (
                                <div className="myCourse_video_cont" key={index}>
                                    <h2 className="course_title">{elem.videoTitle}</h2>
                                    <div className="play_now_btn" onClick={() => { navigate(`/video?id=${elem.videoUrl}&title=${elem.videoTitle}`, { replace: true }); window.scrollTo(top) }}>Watch Now</div>
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

export default MyCourse