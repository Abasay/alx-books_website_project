import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../contexts/contextProvider'
import ReactLoading from 'react-loading'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import './page.scss'
import { myBooks } from '../../data'

const FetchingCategory = () => {
  const {
    bestSelling,
    setBestSelling,
    setLoginPage,
    setBookRoute,
    setSingleBook,
    fetchNav,
    category,
    setCategory,
    categoryNav,
    setCategoryNav,
  } = useGlobalContext()

  const [loading, setLoading] = useState(true)

  const accessToken = localStorage.getItem('userAccessToken')
  // console.log(fetchNav, categoryNav)
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

  const categorySingleBook = (title, obj) => {
    setBookRoute(title)
    setSingleBook(obj)
    navigate(`/book/${title}`)
  }
  const handleBestSellers = async () => {
    //handle Best sellers api
    const url = `https://api.nytimes.com/svc/books/v3//lists/current/${categoryNav}.json?&api-key=RUnW3vOenNDvoKKbJ3rMBmGTy6prxnV1`

    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
    try {
      setLoading(true)

      // const options = {
      //   method: 'GET',
      //   headers: {
      //     Accept: 'application/json',
      //   },
      // }
      await fetch(url, options)
        .then((res) => res.json())
        .then((resp) => {
          setCategory(resp.results.books)

          // setLoading(false)
        })
    } catch (error) {
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Ooops',
      //   text: 'Bad Network Connection, please ensure you have good network connection and reload the page',
      //   confirmButtonColor: 'burlywood',
      //   timer: 5000,
      // })
    }
  }
  useEffect(() => {
    handleBestSellers()
  }, [])
  return (
    <div className='category-page'>
      <h3>
        Library filtered by: Category
        <span style={{ textTransform: 'lowercase', textEmphasis: 'GrayText' }}>
          <em>{`(${fetchNav}):`}</em>
        </span>
      </h3>
      <h4>{fetchNav}</h4>
      <div className='category-books'>
        {!category ? (
          <ReactLoading type='bars' color='burlywood' />
        ) : (
          <div className='category-map'>
            {category.map((book, index) => {
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
                <div className='category-book-list' key={index}>
                  <div
                    className='card'
                    onClick={() => categorySingleBook(title, book)}
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
          </div>
        )}
      </div>
    </div>
  )
}

export default FetchingCategory
