import React, { useState, useEffect } from 'react'
import './landing.css'
import { useGlobalContext } from '../../contexts/contextProvider'
import { FaQuoteRight, FaQuoteLeft } from 'react-icons/fa'
import { myBooks } from '../../data'
import Footer from '../footer/Footer'
import logo from '../../images/Read A Book Motivational Quote Facebook Post.png'

const LandingPage = () => {
  const { loginPage, setLoginPage } = useGlobalContext()
  const [showText, setShowText] = useState(false)
  const fetchBooks = async () => {
    const params = {
      mode: 'no-cors',
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    }
    const google =
      'https://www.googleapis.com/auth/books/key=AIzaSyCn66yVAJ6u8-JZEBaBV7eX2QB-SwnGhAo'
    const url =
      'https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=RUnW3vOenNDvoKKbJ3rMBmGTy6prxnV1'

    const response = await fetch(url)
      .then((response) => {
        console.log(response)
      })
      .then((res) => {
        console.log(res)
      })

    console.log(response)
  }
  // const loadPage = () => {

  // }
  // loadPage()
  return (
    <div className='landing'>
      <div className='landingpage'>
        <img src={logo} width={'100%'} height={500} alt='' />
      </div>

      <div className='quote'>
        <p style={{ lineHeight: '25px' }}>
          <span style={{ marginRight: '10px', display: 'inline-block' }}>
            <FaQuoteLeft size={25} color='brown' />
          </span>
          I can never read all the books I want; I can never be all the people I
          want and live all the lives I want. I can never train myself in all
          the skills I want. And why do I want? I want to live and feel all the
          shades, tones and variations of mental and physical experience
          possible in my life. And I am horribly limited.{' '}
          <span style={{ marginLeft: '10px', display: 'inline-block' }}>
            <FaQuoteRight color='brown' size={25} />
          </span>
        </p>
        <span
          style={{
            fontWeight: '500',
            fontFamily: 'Rajdhani sans-serif',
            marginTop: '10px',
            marginBottom: '10px',
            display: 'inline-block',
          }}
          className='tittle'
        >
          ---Sylvia Plath, The Unabridged Journals of Sylvia Plath
        </span>
      </div>

      <div className='another'>
        <img
          src='https://th.bing.com/th/id/OIP.1ENmGj76FT746K_h8muu6QHaFr?w=251&h=191&c=7&r=0&o=5&pid=1.7'
          alt=''
          width={500}
          height={500}
        />
        <p>Become a reader today</p>
        <button>sign in or create an account</button>
      </div>
      <div className='landing-books'>
        {myBooks[0].books.map((book, index) => {
          const {
            author,
            book_image,
            description,
            title,
            book_uri,
            amazon_product_url,
            rank,
          } = book

          return (
            <div className='landing-book-list'>
              <div className='card' key={index}>
                <div className='img-container'>
                  <img src={book_image} alt={title} width={150} height={200} />
                </div>
                <div className='info'>
                  <h6 style={{ marginTop: '10px' }}>By: {author}</h6>

                  <p
                    className='desc'
                    style={{ fontSize: '12px', marginTop: '10px' }}
                  >
                    {description ? description : amazon_product_url}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LandingPage
