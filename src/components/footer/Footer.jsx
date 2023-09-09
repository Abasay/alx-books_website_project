import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <div className='footer-container'>
      <section className='footer'>
        <div className='about'>
          <h4>About Us</h4>
          <p style={{ marginTop: '20px' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            quibusdam doloribus quam nisi quo recusandae cumque quasi impedit
          </p>
        </div>
        <div>
          <h4 style={{ marginBottom: '20px' }}>The developers</h4>
          <li>Michael Aloh</li>
          <li>Samuel Ilozium</li>
          <li>Abdulsalam Asheem Ayomide</li>
        </div>
        <div className='contact'>
          <h4 style={{ marginBottom: '20px' }}>Contact</h4>
          <li>Email: abdulsalamasheem@gmail.com</li>
          <li>GitHub: Abasay</li>
          <li>Phone Number: 08064611398</li>
        </div>
      </section>
    </div>
  )
}

export default Footer
