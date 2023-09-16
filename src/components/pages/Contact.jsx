import React, { useState } from 'react'
import { Client } from 'filestack-js'
import * as filestack from 'filestack-js'
import { storageRef, database } from '../../firebase'
import '../home/landing.css'
import './page.scss'
import { MdSend } from 'react-icons/md'
import logo from '../../images/Read A Book Motivational Quote Facebook Post.png'
import Swal from 'sweetalert2'

const Contact = () => {
  //Contact Page Component
  const [details, setDetails] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Message sent!!!',
      confirmButtonColor: 'burlywood',
    })
  }

  return (
    <div className='landing'>
      <div className='landingpage'>
        <img src={logo} width={'100%'} height={700} alt='' />
      </div>
      <div
        className='contact-page'
        style={{ margin: '20px auto', width: '80%' }}
      >
        <div className='page'>
          <h3 style={{ display: 'block' }}>Send us a message</h3>
          <form
            action=''
            method='post'
            id='contact_form'
            onSubmit={handleSubmit}
          >
            <input
              type='text'
              className='name'
              placeholder='Full Name*'
              required
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
            />
            <input
              type='email'
              className='email'
              placeholder='Email Address*'
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              required
            />

            <input
              type='text'
              className='subject'
              placeholder='Subject*'
              required
              onChange={(e) =>
                setDetails({ ...details, subject: e.target.value })
              }
            />
            <p style={{ fontWeight: 500 }}>Give us a message</p>
            <textarea
              name='msg'
              id='msg'
              cols='30'
              rows='10'
              required
              placeholder='Message'
              onChange={(e) =>
                setDetails({ ...details, message: e.target.value })
              }
            ></textarea>

            <button type='submit' className='send'>
              send
              <MdSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
