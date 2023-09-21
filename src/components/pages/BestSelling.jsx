import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../contexts/contextProvider'
import ReactLoading from 'react-loading'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import './page.scss'
import { myBooks } from '../../data'

const BestSelling = () => {
  const {
    bestSelling,
    setBestSelling,
    setLoginPage,
    setBookRoute,
    setSingleBook,
    fetchNav,
  } = useGlobalContext()
  const [loading, setLoading] = useState(false)

  const accessToken = localStorage.getItem('userAccessToken')
  const navigate = useNavigate()
  //Chaeck if user is already signed in
  if (!accessToken) {
    setLoginPage(false)
    Swal.fire({
      icon: 'error',
      title: 'Ooops',
      text: 'Please login or signup',
      confirmButtonColor: 'burlywood',
    })
    navigate('/auth')
  }
  setLoginPage(true)

  const bestSellerSingleBook = (title, obj) => {
    setBookRoute(title)
    setSingleBook(obj)
    navigate(`/book/${title}`)
  }
  const handleBestSellers = async () => {
    //handle Best sellers api
    try {
      setLoading(true)

      const url =
        'https://api.nytimes.com/svc/books/v3/lists/overview.json?&api-key=RUnW3vOenNDvoKKbJ3rMBmGTy6prxnV1'

      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
      await fetch(url, options)
        .then((res) => res.json())
        .then((resp) => {
          setBestSelling(resp)
          // console.log(resp)
          setLoading(false)
        })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ooops',
        text: 'Bad Network Connection, please ensure you have good network connection and reload the page',
        confirmButtonColor: 'burlywood',
        timer: 5000,
      })
    }
  }
  useEffect(() => {
    handleBestSellers()
  }, [])
  return (
    <div className='best-selling-page'>
      <h3>
        Library filtered by:{' '}
        <span style={{ textTransform: 'lowercase', textEmphasis: 'GrayText' }}>
          <em>{fetchNav}</em>
        </span>
      </h3>
      <h4
        style={{
          textDecoration: 'underline',
          textDecorationColor: 'burlywood',
        }}
      >
        Weekly Best Selling Books
      </h4>
      <div className='best-selling-books'>
        {!bestSelling ? (
          <ReactLoading type='bars' color='burlywood' />
        ) : (
          bestSelling.map((list) => {
            const { books, list_name } = list
            return (
              <div className='best-container'>
                <h4>{list_name}</h4>
                <article>
                  {books.map((book, index) => {
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
                      <div className='best-selling-book-list' key={index}>
                        <div
                          className='card'
                          onClick={() => bestSellerSingleBook(title, book)}
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
                  })}
                </article>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default BestSelling
