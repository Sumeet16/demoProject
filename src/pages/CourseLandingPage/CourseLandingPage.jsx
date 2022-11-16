import React, { useEffect, useState } from 'react'
import "./CourseLandingPage.css"
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { UilArrowLeft } from '@iconscout/react-unicons'
import { useNavigate } from 'react-router-dom';

const CourseLandingPage = () => {
    const navigate = useNavigate();
    const [courseInfo, setCourseInfo] = useState([]);
    const [courseExist, setcourseExist] = useState(false);
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');

    useEffect(() => {
        const getUser = async () => {
            const userId = localStorage.getItem("userId")

            const response = await axios.post("http://localhost:8000/getUser", {
                userId
            })
            localStorage.setItem("userData", response.data.user.myLearning);
        }
        getUser()
        const getCourseById = async (id) => {
            const res = await fetch("http://localhost:8000/getCourseById", {
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
            localStorage.getItem("userData").split(",").forEach(element => {
                console.log(element);
                if (element == data._id) {
                    setcourseExist(true)
                }
            })
        }
        getCourseById(myParam)
    }, []);
    return (
        <>
            <Header color="black" />
            <div className="back_Btn" onClick={() => {
                navigate('/', { replace: true })
            }}><UilArrowLeft className="iconBack" /></div>
            <div className="courseContainer">
                <h1 className='courseHeading'>{courseInfo.title}</h1>
                <img src={courseInfo.courseImage} alt="courseImage" />
                {courseInfo.discount > 0 ? <>
                    <div className="priceSection">
                        <p className="orignalPrice">{courseInfo.price} RS</p>
                        <p className="discountPercentage">-{courseInfo.discount}%</p>
                    </div>
                </> : <></>}
                <p className="discountedPrice" style={courseInfo.discount > 0 ? {} : { marginTop: "1rem" }}>{courseInfo.dprice}RS</p>
                {courseExist ? <><p className="buyNowBTN" onClick={() => { navigate(`/mylearning?id=${courseInfo._id}`, { replace: true }) }}>You Already Own This Course</p></> : <><p className="buyNowBTN" onClick={() => { navigate(`/payment?id=${courseInfo._id}`, { replace: true }) }}>Buy Now</p></>}
                <h2 className="sub_heading">Description</h2>
                <p className="sub_description">{courseInfo.description}</p>
            </div>
            <Footer />
        </>
    )
}

export default CourseLandingPage