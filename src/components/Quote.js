import React from 'react'
import hands from '../assets/hands.png'
const Quote = () => {
  return (
    <>
    <div className="quote-container">

        <img src={hands} alt="" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, quidem?</p>
        <span> - author name</span>
    </div>
    </>
  )
}

export default Quote