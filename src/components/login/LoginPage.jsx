import React, { useEffect, useState } from 'react'
import './login.css'
import { useGlobalContext } from '../../contexts/contextProvider'
import { MdDone } from 'react-icons/md'

const LoginPage = () => {
  //The Login Page Component
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

  const [err, setErr] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [passwdErr, setPasswdErr] = useState(false)

  useEffect(() => {
    if (details.password === details.confirmPassword) {
      setErr(false)
      setCorrect(true)
      setTimeout(() => {
        setCorrect(false)
      }, 2000)
    } else {
      setErr(true)
    }
  }, [details.confirmPassword])

  useEffect(() => {
    if (
      details.confirmPassword &&
      details.password !== details.confirmPassword
    ) {
      setErr(true)
    } else {
      setErr(false)
      setCorrect(true)
      setTimeout(() => {
        setCorrect(false)
      }, 2000)
    }
  }, [details.password])

  useEffect(() => {
    if (details.password.length < 6) {
      setPasswdErr(true)
    } else {
      setPasswdErr(false)
    }
  }, [details.password])
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
            <label htmlFor='password' style={{ marginLeft: '10px' }}>
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
            {passwdErr && (
              <section style={{ textAlign: 'center', color: 'red' }}>
                {signUp && 'Password length should be more than 6'}
              </section>
            )}
            {signUp && (
              <input
                type='password'
                name='password'
                id='passwd'
                required='required'
                placeholder='Re-enter Password'
                pattern=''
                value={details.confirmPassword}
                onChange={(e) => {
                  setDetails({ ...details, confirmPassword: e.target.value })
                }}
              />
            )}
            {err && (
              <section style={{ textAlign: 'center', color: 'red' }}>
                {signUp && 'Mismatch in password entry'}
              </section>
            )}
            {correct && (
              <section style={{ textAlign: 'center', color: 'green' }}>
                {signUp && (
                  <span>
                    <MdDone color='green' /> Password matched
                  </span>
                )}
              </section>
            )}
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
