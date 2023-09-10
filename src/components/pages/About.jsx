import React from 'react'
import logo from '../../images/Read A Book Motivational Quote Facebook Post.png'
import '../home/landing.css'
const About = () => {
  return (
    <div className='landing'>
      <div className='landingpage'>
        <img src={logo} width={'100%'} height={500} alt='' />
      </div>
      <div className='about-page' style={{ margin: '20px auto', width: '80%' }}>
        <h3 style={{ marginBottom: '30px' }}>About</h3>
        <p>
          A portfolio Project that recommends books according to the user's like
        </p>
      </div>
    </div>
  )
}

export default About
