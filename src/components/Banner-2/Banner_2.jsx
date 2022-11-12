import React, { useState } from 'react'
import "./Banner_2.css"
import axios from "axios";
import { UilUsersAlt } from '@iconscout/react-unicons'
import { UilFileBookmarkAlt } from '@iconscout/react-unicons'
import { UilBookReader } from '@iconscout/react-unicons'
import { useEffect } from 'react';

const Banner_2 = () => {
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
            <div className="banner_cont">
                <div className="bg_cont">
                    <div className="banner_row">
                        <UilUsersAlt className="banner_icons" />
                        <p className="banner_number">300+</p>
                        <p className="sub_heading">Trusted User</p>
                    </div>
                    <div className="banner_row">
                        <UilFileBookmarkAlt className="banner_icons" />
                        <p className="banner_number">{course.length}</p>
                        <p className="sub_heading">Courses Available</p>
                    </div>
                    <div className="banner_row">
                        <UilBookReader className="banner_icons" />
                        <p className="sub_heading">Made by Industry Experts</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner_2