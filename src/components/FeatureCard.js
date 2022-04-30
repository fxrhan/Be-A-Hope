import React from 'react'

const FeatureCard = ({icon, name, text }) => {
  return (
    
        <div className="feature-card">
            <div className="icon-container">
                <i className={icon}></i>
            </div>
            <div className="text-container">
                <h2>{name}</h2>
                <p>{text}</p>
            </div>
        </div>

  )
}

export default FeatureCard