import React, { useState } from 'react'
import './home.css'
import { useGlobalContext } from '../../contexts/contextProvider'

const HomePage = () => {
  const { bookList } = useGlobalContext()

  console.log(bookList[0])
  // const { books } = bookList[0]

  return (
    <div className='books'>
      <div>
        {bookList.map((list) => {
          const { books, list_name, list_id } = list
          return (
            <article key={list_id}>
              <h3>{list_name}</h3>
              <div>
                {books.map((book) => {
                  const {
                    author,
                    book_image,
                    description,
                    title,
                    book_uri,
                    rank,
                  } = book
                  return (
                    <div className='card' key={rank}>
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

                        <p>{description}</p>
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
  )
}

export default HomePage
