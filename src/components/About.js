import React from "react";
import aboutimage from '../assets/about.png';


const About = () => {
  return (
    <div className="about-container">
      <img src={aboutimage} alt="" />
      <div className="about-data">
        <div className="about-title">ABOUT US</div>
        <div className="about-des">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum is simply dummy text of the
          printing and typesetting industry.
        </div>
        <div className="about-btn primary-btn">
          <button>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default About;
