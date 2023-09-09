import React, { useEffect, useState } from 'react'
import './home.css'
import { useGlobalContext } from '../../contexts/contextProvider'
import { myBooks } from '../../data'

const HomePage = () => {
  const { bookList, showHeader, setShowHeader, addToFavorite } =
    useGlobalContext()

  // const [favorite, setFavorite] = useState([])
  // const [value, setValue] = useState('')
  // const [favorite, setFavorite] = useState([
  //   {
  //     list_name: '',
  //     books: {
  //       author: '',
  //       book_image: '',
  //       description: '',
  //       title: '',
  //       book_uri: '',
  //       amazon_product_url: '',
  //       rank: '',
  //     },
  //   },
  // ])
  // const addToFavorite = (obj) => {
  //   console.log(obj)
  //   setFavorite((prev) => [...prev, obj])
  // }
  // // const { books } = bookList[0]
  // useEffect(() => {
  //   setFavorite(favorite)
  // }, [favorite])

  // console.log(favorite)

  return (
    <div className='books'>
      <div>
        {myBooks.map((list) => {
          const { books, list_name, list_id } = list
          return (
            <article key={list_id}>
              <h3>{list_name}</h3>
              {/* <button onClick={() => addToFavorite(list_name)}>add</button> */}
              <div>
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
                    <div className='card' key={index}>
                      <div className='img-container'>
                        <img
                          src={book_image}
                          alt={title}
                          width={150}
                          height={200}
                        />
                      </div>
                      <div className='info'>
                        <h3>{author}</h3>

                        <p>{description ? description : amazon_product_url}</p>
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
  )
}

export default HomePage
