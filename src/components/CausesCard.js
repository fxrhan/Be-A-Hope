import React from "react";
import '../App.css'

const CausesCard = ({ src, name, description }) => {
  return (
    <div className="card">
      <img src={src} alt="" />
      <div className="recent-tag">Recent</div>
      <div className="card-info">
        <div className="card-title">{name}</div>
        <div className="card-des">{description}</div>
       
      </div>
    </div>
  );
};

export default CausesCard;
