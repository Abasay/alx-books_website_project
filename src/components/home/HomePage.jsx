import React, { useEffect, useState } from 'react'
import './home.scss'
import { useGlobalContext } from '../../contexts/contextProvider'
// import { myBooks } from '../../data'
import { useNavigate } from 'react-router-dom'

import Loading from './Loading'
import Swal from 'sweetalert2'
const HomePage = () => {
  //The Home Component
  const { bookList, setLoginPage, setSingleBook, setBookRoute, setBookList } =
    useGlobalContext()

  //Assigning useNavigate to a variable
  const navigate = useNavigate()

  const accessToken = localStorage.getItem('userAccessToken')

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
        })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ooops',
        text: 'Bad Network Connection, please reload the page',
        confirmButtonColor: 'burlywood',
        timer: 3000,
      })
    }
  }

  useEffect(() => {
    //Update the Page as re-renders by executing the handleBooklist function
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
