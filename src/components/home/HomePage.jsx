import React, { useEffect, useState } from 'react'
import './home.scss'
import { useGlobalContext } from '../../contexts/contextProvider'
// import { myBooks } from '../../data'
import { useNavigate } from 'react-router-dom'
import { FcEmptyFilter } from 'react-icons/fc'
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri'
import { MdCancel } from 'react-icons/md'
import Loading from './Loading'
import Swal from 'sweetalert2'
import ReactLoading from 'react-loading'
const HomePage = () => {
  //The Home Component
  const {
    bookList,
    setLoginPage,
    setSingleBook,
    setBookRoute,
    setBookList,
    setFetchNav,
    fetchNav,
    categoryNav,
    setCategoryNav,
  } = useGlobalContext()

  const [category, setCategory] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [showCategory, setShowCategory] = useState(false)

  //Assigning useNavigate to a variable
  const navigate = useNavigate()
  function categoryList() {
    bookList.map()
  }

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
          const categories = res.results.lists.map(
            (category) => category.list_name
          )
          setCategory(categories)
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

  const postToBackend = (type) => {
    let lower = type.toLowerCase()
    const strType = lower.replace(' ', '-')
    setCategoryNav(strType)
    // const url = 'http://localhost:5000/books-category'
    // const options = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     bookCategory: strType,
    //   }),
    // }
    // await fetch(url, options)
    //   .then((res) => {
    //     res.json()
    //   })
    //   .then((resp) => {
    //     console.log(resp)
    //   })
    //   .catch((err) => {
    //     console.log(err.message)
    //   })
  }

  useEffect(() => {
    //Update the Page as re-renders by executing the handleBooklist function
    handleBookList()
  }, [])
  return (
    <>
      {!loading ? (
        <div className='books' style={{ marginTop: '80px' }}>
          <div className='library-header'>
            <div className='lib-headers'>
              <h2>Library</h2>
              <h3
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setShowFilter((prev) => !prev)
                  setShowCategory((prev) => !prev)
                }}
              >
                Filter <FcEmptyFilter />
              </h3>
            </div>

            <p></p>
            <div className='filter'>
              <div className={showFilter ? 'filter-container' : 'hide'}>
                <p
                  onClick={() => {
                    setShowFilter((prev) => !prev)
                    setShowCategory((prev) => !prev)
                  }}
                >
                  <MdCancel size={25} color='burlywood' />
                </p>
                <button onClick={() => setShowCategory((prev) => !prev)}>
                  <span className='btn-text'>By category</span>

                  <span className='drop'>
                    {showCategory ? (
                      <RiArrowDropDownLine size={27} />
                    ) : (
                      <RiArrowDropUpLine size={27} />
                    )}
                  </span>
                </button>
                <button
                  onClick={() => {
                    setShowFilter(false)
                    setFetchNav('Best-Selling')
                    navigate('/library/best-selling-books')
                  }}
                >
                  Best-Selling
                </button>
              </div>
              <div className={showCategory ? 'category-list' : 'hide'}>
                <ul>
                  {category.map((categ, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          postToBackend(categ)
                          setShowFilter(false)
                          setFetchNav(categ)
                          navigate(`/library/category/${categ}`)
                        }}
                      >
                        {categ}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
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
        <div
          style={{
            display: 'grid',
            width: '100%',
            placeItems: 'center',
            marginTop: '100px',
          }}
        >
          <ReactLoading
            type='bars'
            color='burlywood'
            height={400}
            width={200}
          />
        </div>
      )}
    </>
  )
}

export default HomePage
