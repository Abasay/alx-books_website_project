import React, { useState, useEffect } from 'react'
import './landing.css'
import { useGlobalContext } from '../../contexts/contextProvider'
import { FaQuoteRight, FaQuoteLeft, FaLeaf } from 'react-icons/fa'
import { myBooks } from '../../data'
import Footer from '../footer/Footer'
import logo from '../../images/Read A Book Motivational Quote Facebook Post.png'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ReactLoading from 'react-loading'
import Loading from './Loading'

const LandingPage = () => {
  const {
    // loginPage,
    setLoginPage,
    // bookRoute,
    // singleBook,
    setSingleBook,
    setBookRoute,
    // handleFavoriteBooks,
  } = useGlobalContext()
  const [showText, setShowText] = useState(false)
  const navigate = useNavigate()
  const [randBook, setRandBook] = useState()
  const [randnum, setRandNum] = useState(0)
  const [loading, setLoading] = useState(false)

  const accessToken = localStorage.getItem('userAccessToken')
  const userEmail = localStorage.getItem('user-email')
  if (accessToken && userEmail) {
    setLoginPage(true)
  }

  const landinPageSingleBook = (title, obj) => {
    setBookRoute(title)
    setSingleBook(obj)
    navigate(`/book/${title}`)
  }
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const handleBooksfromBackend = async () => {
    const randNum = randomIntFromInterval(0, 18)
    try {
      setLoading(true)
      const url =
        'https://api.nytimes.com/svc/books/v3/lists//full-overview.json?&api-key=RUnW3vOenNDvoKKbJ3rMBmGTy6prxnV1'

      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
      await fetch(url, options)
        .then((res) => res.json())
        .then((resp) => {
          setRandNum(randNum)
          // console.log(resp)
          // console.log()
          return resp.results.lists
        })
        .then((res) => {
          // console.log(res)
          // console.log(randnum)
          setRandBook(res[randNum])

          // console.log(randBook)
          setLoading(false)
        })
    } catch (error) {}
  }

  useEffect(() => {
    handleBooksfromBackend()
  }, [])
  return (
    <div className='landing'>
      <div className='landingpage'>
        <img src={logo} width={'100%'} height={700} alt='' />
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
            fontWeight: '600',
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
        <p>Become a reader today!!!</p>
        <button>sign in or create an account</button>
      </div>
      <div className='landing-books'>
        {!randBook ? (
          <div
            style={{
              display: 'grid',
              width: '100%',
              placeItems: 'center',
            }}
          >
            <ReactLoading
              type='bars'
              color='burlywood'
              height={400}
              width={200}
            />
          </div>
        ) : (
          randBook.books.map((book, index) => {
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
              <div className='landing-book-list' key={index}>
                <div
                  className='card'
                  onClick={() => landinPageSingleBook(title, book)}
                >
                  <div className='img-container'>
                    <img
                      src={book_image}
                      alt={title}
                      width={150}
                      height={200}
                    />
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
          })
        )}
      </div>
    </div>
  )
}

export default LandingPage
