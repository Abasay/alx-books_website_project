import React from 'react'
import { useGlobalContext } from '../../contexts/contextProvider'
import { FaHandPointDown } from 'react-icons/fa'
import './singlebook.scss'

const SingleBook = () => {
  const { bookRoute, singleBook, handleFavoriteBooks } = useGlobalContext()

  console.log(singleBook.author)
  const {
    age_group,
    amazon_product_url,
    article_chapter_link,
    author,
    book_image,
    book_image_width,
    book_image_height,
    book_review_link,
    book_uri,
    contributor,
    contributor_note,
    created_date,
    description,
    first_chapter_link,
    price,
    primary_isbn10,
    primary_isbn13,
    publisher,
    rank,
    rank_last_week,
    sunday_review_link,
    title,
    updated_date,
    weeks_on_list,
    buy_links,
  } = singleBook

  return (
    <div style={{ marginTop: '50px' }} className='single-book'>
      <h3>{title}</h3>
      <h4>By: {author}</h4>
      <img src={book_image} alt={title} width={300} height={300} />

      <div className='btns'>
        <button onClick={() => handleFavoriteBooks(singleBook)}>
          Add to Favorite
        </button>
        <button>Read Now</button>
      </div>
      <p>
        <span style={{ fontWeight: 600 }}>Published by: </span>
        {publisher}
      </p>
      <div>
        <p>
          <span style={{ fontWeight: 600 }}> Created at: </span>
          {created_date}, <span style={{ fontWeight: 600 }}> Updated at: </span>
          {updated_date}
        </p>

        <p>
          {' '}
          <span style={{ fontWeight: 600 }}> Description: </span>
          {description}
        </p>
        <p style={{ fontWeight: 600 }}>
          Buy Book <FaHandPointDown size={16} color='brown' />
          <div className='links'>
            {buy_links.map((link, index) => {
              return (
                <div className='buy' key={index}>
                  <span style={{ fontWeight: 500 }}>{link.name}: </span>
                  <a href={link.url}>{link.url}</a>
                </div>
              )
            })}
          </div>
        </p>
      </div>
    </div>
  )
}

export default SingleBook
