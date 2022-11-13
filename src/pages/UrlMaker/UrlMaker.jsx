import React, { useEffect, useState } from 'react'
import "./UrlMaker.css"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { UilTrashAlt } from '@iconscout/react-unicons'


const UrlMaker = () => {
    const [videoData, setvideoData] = useState([]);
    const [fileUrl, setfileUrl] = useState("");
    const [videoTitle, setvideoTitle] = useState("");

    const getVideoList = async () => {
        const res = await axios("http://localhost:8080/getVideos", {
            method: "GET",
        });
        setvideoData(res.data.video);
    }

    const deleteIt = async (id) => {
        const res = await fetch("http://localhost:8080/deleteVideo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id
            })
        })

        const result = await res.json();
        console.log(result);

        getVideoList();
    }


    const handleFileSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:8080/videotoUrl", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileUrl,
                videoTitle
            })
        })

        const result = await res.json();
        const statusCode = res.status;

        if (statusCode === 422 || !result) {
            toast.error("Video Not Added !!!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (statusCode == 409) {
            toast.error("Same Video Exists", {
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
            toast.success("Video Added", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        getVideoList()
    }

    useEffect(() => {
        getVideoList()
    }, []);


    return (
        <>
            <div className="addBlogMainContain">
                <ToastContainer />
                <form
                    method="post"
                    onSubmit={(e) => handleFileSubmit(e)}
                    className="input-holder-addblog"
                >
                    <h2>Video To URL Convertor</h2>
                    <input
                        type="text"
                        name="file"
                        id="file"
                        placeholder='Enter File Path'
                        onChange={(e) => { setfileUrl(e.target.value) }}
                    />
                    <input
                        type="text"
                        name="file"
                        id="file"
                        placeholder='Enter Video Title'
                        onChange={(e) => { setvideoTitle(e.target.value) }}
                    />
                    <button type="submit" className="submit-btn">
                        Convert To URL
                    </button>
                </form>

                <div className="updateSection">
                    <h1>Video Links</h1>

                    {videoData.length == 0 ? <><b>No Video Data</b></> : <div className="updateCourseCard">
                        {
                            videoData.map((elem, index) => {
                                console.log(elem);
                                return (
                                    <>
                                        <div className="cardRow">
                                            <div className="leftSide" style={{ width: "85%" }}>
                                                <div className="detailsDiv">
                                                    <p className="detailDivTitle">Video Title</p>
                                                    <p className="details">{elem.videoTitle}</p>
                                                </div>
                                                <div className="detailsDiv">
                                                    <p className="detailDivTitle">Email Status</p>
                                                    {elem.videoStatus ? <><p className="details">Video Uploaded ✅</p></> : <><p className="details">Wait while video is uploading...</p></>}
                                                </div>
                                            </div>
                                            <div className="rightSide" style={{ width: "15%" }}>
                                                <div className="editBTN" style={{ fontWeight: "800", fontSize: "1.1rem" }}> <a style={{ textDecoration: "none", color: "black", border: "none" }} href={elem.videoUrl} target="_blank" rel="noopener noreferrer">View Now</a> </div>
                                            </div>
                                            <div className="rightSide" style={{ width: "15%" }}>
                                                <div className="deleteBTN"><UilTrashAlt onClick={() => { deleteIt(elem._id) }} /></div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>}
                </div>
            </div>
        </>
    )
}

export default UrlMaker