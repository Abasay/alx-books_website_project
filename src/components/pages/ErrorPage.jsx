import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  //Error Page for unknown or undefined routes
  const navigate = useNavigate()
  return (
    <div
      style={{
        display: 'grid',
        alignItems: 'center',
        verticalAlign: 'center',
        placeContent: 'center',
        marginTop: '150px',
      }}
    >
      404!! This page do not exist click{' '}
      <span
        onClick={() => navigate('/')}
        style={{
          textDecoration: 'underline',
          color: 'burlywood',
          cursor: 'pointer',
        }}
      >
        here
      </span>
      to go back to the homepage
    </div>
  )
}

export default ErrorPage
