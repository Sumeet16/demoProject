import React from "react";
import Banner from "../../components/Banner/Banner"
import bannerImg from "../../assets/img/bg/page-title.jpg"
import Header from "../../components/Header/Header"
import our_team from "../../assets/img/about/our-team.jpg";
import about1 from "../../assets/img/about/about1.jpg";
import about2 from "../../assets/img/about/about2.jpg";
import "./About.css"
import Footer from "../../components/Footer/Footer";

const About = () => {
    return (
        <>
            <Header color="black" />
            <Banner bannerImg={bannerImg} title="ABOUT" component="Home/Pages/About" />

            <div className="sec1-wrapper">
                <h1 className="sec1-header">We Are Awesome People</h1>
                <div className="section1-content">
                    <div className="sec1-img">
                        <img src={our_team} alt="team Image" />
                    </div>
                </div>
            </div>
            <div className="sec2-wrapper">
                <div className="sec2">
                <h1>About Us</h1>
                <hr />
                <div className="section2-content">
                    <p>Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit.</p>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p>
                </div>
                </div>
                <div className="sec2-img">
                    <img src={about1} alt="Image" />
                    <img src={about2} alt="Image" />
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default About;