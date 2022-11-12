import React, { useEffect } from 'react'
import './Homepage.css'
import Header from '../../components/Header/Header'
import HomePageAnimation from '../../components/HomePageAnimation/HomePageAnimation'
import KeyNotes from '../../components/KeyNotes/KeyNotes'
import Course from '../../components/Course/Course'
import image1 from "../../assets/img/slider/slider1.jpg"
import Footer from '../../components/Footer/Footer'
import Banner_2 from '../../components/Banner-2/Banner_2'
import HomePageBlogSection from '../../components/HomePageBlogSection/HomePageBlogSection'


const Homepage = () => {
    return (
        <>
            <section id='home'>
                <div className="banner-container">
                    <Header />
                    <div className='screenAnimation'></div>
                    <HomePageAnimation />
                </div>
                <KeyNotes />
                <Course />
                <Banner_2/>
                <HomePageBlogSection/>
                <Footer/>
            </section>
        </>
    )
}

export default Homepage