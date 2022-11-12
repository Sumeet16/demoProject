import React from "react";
import './Banner.css'
const Banner = ({ bannerImg, title, component }) => {
  return (
    <>
      <div className="image-wrapper">
        <img src={bannerImg} alt="" className="blog-img" />
        <div className="bannerFlexCont">
          <h1>{title}</h1>
          <p>{component}</p>
        </div>
      </div>
    </>
  );
};

export default Banner;
