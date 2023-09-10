import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <div className='footer-container'>
      <section className='footer'>
        <div className='about'>
          <h4>About</h4>
          <p style={{ marginTop: '20px' }}>
            This a book recommender Project solely to expose elders, youths, and
            children to the awesome world of reading.
          </p>
        </div>
        <div>
          <h4 style={{ marginBottom: '20px' }}>Developers</h4>
          <li>Abdulsalam Asheem Ayomide</li>
          <li>Michael Aloh</li>
          <li>Samuel Ilozium</li>
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
