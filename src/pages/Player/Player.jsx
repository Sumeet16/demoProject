import React, { useEffect, useState } from 'react'
import "./Player.css"
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ReactPlayer from 'react-player';

const Player = () => {
    const [url, seturl] = useState("");
    const [title, settitle] = useState("");

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');
        const titleName = queryParams.get('title');

        seturl(id)
        settitle(titleName)
    }, []);

    return (
        <>
            <Header color="black" />
            <div className="videoplayer_cont">
                <h2>{title}</h2>
                <ReactPlayer controls={true} playing={true} url={url} width='90%' height='85%' className='videoPlayer' />
            </div>
            <Footer />
        </>
    )
}

export default Player