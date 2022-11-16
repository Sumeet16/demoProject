import React, { useEffect } from 'react'
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer";
import "./Events.css"
import { useState } from 'react';
import axios from "axios";
import moment from 'moment';
import Banner from "../../components/Banner/Banner";
import bannerImg from "../../assets/img/bg/page-title.jpg";

const Events = () => {
    const [ScheduleMeeting, setScheduleMeeting] = useState([]);

    useEffect(() => {
        const getMeetingsList = async () => {
            const res = await axios("http://localhost:8000/getMeetings", {
                method: "GET",
            });

            const data = res.data.meetings;
            const courseIds = localStorage.getItem("userData").split(",");

            const arr = [];

            for (let i = 0; i < data.length; i++) {
                if (data[i] != null) {
                    courseIds.forEach(element => {
                        if (element === data[i].courseId) {
                            arr.push(data[i])
                            setScheduleMeeting(arr)
                        }
                    })
                }
            }

        }
        getMeetingsList()
    }, []);


    return (
        <>
            <Header color="black" />
            <Banner bannerImg={bannerImg} title="NEW EVENTS" component="Home/Pages/Events" />
            {ScheduleMeeting.length == 0 ? <><h2 style={{ margin: "1rem", fontWeight: "600" }}>No Scheduled Event At This Time...</h2></> : <div className="updateCourseCard">
                {
                    ScheduleMeeting.map((elem, index) => {
                        const access = localStorage.getItem("userName");
                        const meetingLink = `http://localhost:3000/?id=${elem.courseT.replaceAll(' ', '')}&ref=user&&name=${access}`
                        return (
                            <>
                                <div className="cardRow" style={{ marginLeft: "1rem", marginTop: "2rem" }}>
                                    <div className="leftSide" style={{ width: "85%" }}>
                                        <div className="detailsDiv">
                                            <p className="detailDivTitle">Meeting Title</p>
                                            <p className="details">{elem.meetingTitle}</p>
                                        </div>
                                        <div className="detailsDiv">
                                            <p className="detailDivTitle">Meeting Date And Time</p>
                                            <p className="details">{moment(elem.dateAndTimeSelecter).format("llll")}</p>
                                        </div>
                                        <div className="detailsDiv">
                                            <p className="detailDivTitle">Course Title</p>
                                            <p className="details">{elem.courseT}</p>
                                        </div>
                                    </div>
                                    <div className="rightSide" style={{ width: "15%" }}>
                                        <div className="editBTN" style={{ fontWeight: "800", fontSize: "1.1rem" }}> <a style={{ textDecoration: "none", color: "black" }} href={meetingLink} target="_blank" rel="noopener noreferrer">Join Now</a> </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>}
            <Footer />
        </>
    )
}

export default Events