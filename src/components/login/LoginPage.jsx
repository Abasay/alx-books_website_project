import React, { useState } from 'react'
import geo1 from './geo1.png'
import './login.css'
import illustration from '../illustration_register.png'
import { useGlobalContext } from '../../contexts/contextProvider'
import { useDispatch } from 'react-redux'
import { signIn } from '../../redux/auth'

const LoginPage = () => {
  const {
    signUp,
    details,
    setDetails,
    handleSignIn,
    handleLogin,
    error,
    errorMsg,
  } = useGlobalContext()

  return (
    <div className='login_container'>
      <div className='display-sidebar'>
        <img src={geo1} alt='geo1' width={100} height={100} id='img1' />
        <h1>You want seamless transaction? Then you are at the right place</h1>
        <img src={illustration} alt='illustration imag' id='img2' />
      </div>

      <div className='input_page'>
        {signUp ? (
          <div className='header'>
            <h5>Get Started</h5>
            <p>Create account in one click</p>
          </div>
        ) : (
          <div className='header'>
            <h5 style={{ marginBottom: '10px' }}>
              Sign in to your account below
            </h5>
            <p>Enter your details:</p>
          </div>
        )}
        {/* {error && (
          <div className='error'>
            <p>{errorMsg}</p>
          </div>
        )} */}

        <div className='inputs'>
          <div className='names'>
            {signUp && (
              <input
                type='text'
                name='first name'
                id='first-name'
                placeholder='First name'
                value={details.first_name}
                onChange={(e) => {
                  setDetails({ ...details, first_name: e.target.value })
                }}
              />
            )}
            {signUp && (
              <input
                type='text'
                name='last name'
                id='last-name'
                placeholder='Last name'
                value={details.last_name}
                onChange={(e) => {
                  setDetails({ ...details, last_name: e.target.value })
                }}
              />
            )}
          </div>
          <div className='others'>
            <label htmlFor='email' style={{ marginLeft: '10px' }}>
              Email:
            </label>
            <input
              type='email'
              name='email'
              required='required'
              placeholder='Email address'
              value={details.email}
              onChange={(e) => {
                setDetails({ ...details, email: e.target.value })
              }}
            />
            {signUp && (
              <input
                type='number'
                name='Phone number'
                placeholder='Phone Number'
                value={details.phone_number}
                onChange={(e) => {
                  setDetails({ ...details, phone_number: e.target.value })
                }}
              />
            )}
            {signUp && (
              <input
                type='email'
                name='email'
                required='required'
                placeholder='Referral Email [ Optional ]'
                value={details.referrer}
                onChange={(e) => {
                  setDetails({ ...details, referrer: e.target.value })
                }}
              />
            )}
            {/* <select name='gender' id=''>
              <input type='text' value='male' />
            </select> */}
            {/* <input type='radio' name='male' id='' value='male' />
            <span>male</span> */}
            <label htmlFor='email' style={{ marginLeft: '10px' }}>
              Password:
            </label>
            <input
              type='password'
              name='password'
              id='passwd'
              required='required'
              placeholder='Enter your password'
              value={details.password}
              onChange={(e) => {
                setDetails({ ...details, password: e.target.value })
              }}
            />
            {/* <fieldset>
              <legend>Password</legend>
              <input
                type='password'
                name='password'
                id='passwd'
                required='required'
                placeholder='Enter your password'
              />
            </fieldset> */}
            {signUp ? (
              <input
                type='button'
                value='Register'
                id='btn'
                onClick={() => handleSignIn()}
              />
            ) : (
              <input
                type='button'
                value='Login'
                id='btn'
                onClick={() => handleLogin()}
              />
            )}

            <p id='text'>
              By registering, I agree to Geotopup{' '}
              <span>Terms of Service and Privacy Policy.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
