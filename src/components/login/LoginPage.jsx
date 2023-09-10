import React, { useState } from 'react'
import geo1 from './geo1.png'
import './login.css'
import illustration from '../illustration_register.png'
import { useGlobalContext } from '../../contexts/contextProvider'
import { useDispatch } from 'react-redux'
import { signIn } from '../../redux/auth'
import img1 from '../../images/Life is Bori.png'
import book1 from '../../images/BOOKS (3).png'

const LoginPage = () => {
  //The Login Page
  const {
    signUp,
    details,
    setDetails,
    handleSignIn,
    handleLogin,
    error,
    errorMsg,
    setShowHeader,
    tempHandleLogIN,
    handleChangeAuth,
    setLoginPage,
  } = useGlobalContext()
  setLoginPage(false)
  return (
    <div className='login_container'>
      <div className='input_page'>
        <div className='changeAuth'>
          {signUp ? (
            <span>Already have an account ? Log in </span>
          ) : (
            <span>Don't have an account ? Sign in </span>
          )}
          <span onClick={handleChangeAuth} className='span'>
            here
          </span>
        </div>

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
                onClick={handleLogin}
              />
            )}

            <p id='text'>
              By registering, You are agreeing to our{' '}
              <span>Terms of Service and Privacy Policy.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
