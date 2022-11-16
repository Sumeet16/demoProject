import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AdminChatRoom = () => {
    const navigate = useNavigate();
    let link
    const [course, setCourse] = useState([]);
    const getCourse = async () => {
        const res = await axios("http://localhost:8000/getCourse", {
            method: "GET",
        });
        setCourse(res.data.course);
    };

    useEffect(() => {
        getCourse();
    }, []);

    return (
        <>
            <div className="community_cont">
                <div className="chat_room_cont">
                    <div className="demoBox">
                        {
                            course.map((elem, index) => {
                                link = `http://localhost:5173/chat?userName=Admin&id=${elem.title.replaceAll(' ', '')}`
                                return (
                                    <div className="courseCard">
                                        <img src={elem.courseImage} className="imageCard" alt="" srcset="" />
                                        <h2>{elem.title}</h2>
                                        <a className="button" href={link} target="_blank">Click Here</a>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminChatRoom