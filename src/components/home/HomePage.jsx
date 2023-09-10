import React, { useEffect, useState } from 'react'
import './home.scss'
import { useGlobalContext } from '../../contexts/contextProvider'
import { myBooks } from '../../data'
import { useNavigate } from 'react-router-dom'

import Loading from './Loading'
const HomePage = () => {
  const {
    bookList,

    setLoginPage,

    setSingleBook,
    setBookRoute,

    setBookList,
  } = useGlobalContext()
  const navigate = useNavigate()

  const accessToken = localStorage.getItem('userAccessToken')
  if (!accessToken) {
    setLoginPage(false)
    alert('Access denied, please login or signup')
    navigate('/auth')
  }
  const [loading, setLoading] = useState(true)

  setLoginPage(true)
  const handleBookList = async () => {
    setLoading(true)
    try {
      const url =
        'https://api.nytimes.com/svc/books/v3/lists//full-overview.json?&api-key=RUnW3vOenNDvoKKbJ3rMBmGTy6prxnV1'
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
      await fetch(url, options)
        .then((response) => response.json())
        .then((res) => {
          setBookList(res.results.lists)
          setLoading(false)
          console.log(res.results.lists)
        })
    } catch (error) {
      // console.log(error.message)
    }
  }

  useEffect(() => {
    handleBookList()
  }, [])
  return (
    <>
      {!loading ? (
        <div className='books' style={{ marginTop: '80px' }}>
          <h2 style={{ textAlign: 'center', fontWeight: '600' }}>Library</h2>
          <div className='head-list'>
            {bookList.map((list) => {
              const { books, list_name, list_id } = list
              return (
                <article key={list_id}>
                  <h4 style={{ fontWeight: 500 }}>{list_name}</h4>
                  {/* <button onClick={() => addToFavorite(list_name)}>add</button> */}
                  <div className='booklist'>
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
                      const bookObj = {
                        list_name,
                        books: {
                          author,
                          book_image,
                          description,
                          title,
                          book_uri,
                          amazon_product_url,
                          rank,
                        },
                      }
                      return (
                        <div
                          className='card'
                          key={index}
                          onClick={() => {
                            setBookRoute(title)
                            setSingleBook(book)
                            navigate(`/book/${title}`)
                          }}
                          style={{ cursor: 'pointer' }}
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
                            <h6>By: {author}</h6>

                            {/* <p>{description ? description : amazon_product_url}</p> */}
                          </div>
                          {/* <span
                        className='button'
                        onClick={() => addToFavorite(bookObj)}
                      >
                        Add to Favorite
                      </span> */}
                        </div>
                      )
                    })}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </>
  )
}

export default HomePage
