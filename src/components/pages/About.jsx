import React from 'react'
import logo from '../../images/Read A Book Motivational Quote Facebook Post.png'
import '../home/landing.css'
const About = () => {
  //About Page Component
  return (
    <div className='landing'>
      <div className='landingpage'>
        <img src={logo} width={'100%'} height={700} alt='' />
      </div>
      <div
        className='about-page'
        style={{
          margin: '20px auto',
          width: '80%',
          height: '150px',
        }}
      >
        <h3 style={{ marginBottom: '30px' }}>About</h3>
        <p style={{ marginBottom: '50px' }}>
          This website is dedicated to providing book enthusiasts with a wide
          range of genres, recommendations, and reviews. Explore our collection
          and discover your next favorite book here.
        </p>
      </div>
    </div>
  )
}

export default About
