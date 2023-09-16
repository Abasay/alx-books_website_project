import React, { useEffect, useState } from 'react'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useGlobalContext } from '../../contexts/contextProvider'
import './page.scss'
import ReactLoading from 'react-loading'
import { useNavigate } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import Swal from 'sweetalert2'

const Favorite = () => {
  //Favorite function component
  const navigate = useNavigate()

  const accessToken = localStorage.getItem('userAccessToken')
  const {
    usersFavorite,
    setUsersFavorite,
    loader,
    setLoginPage,
    setBookRoute,
    setSingleBook,
  } = useGlobalContext()

  if (!accessToken) {
    setLoginPage(false)
    Swal('error', 'Ooops, Not logged in', 'Please login or signup')
    navigate('/auth')
  }
  const userId = localStorage.getItem('book-user-id')

  const [userFav, setUserFav] = useState([])
  const [loading, setLoading] = useState(false)
  const [delet, setDelet] = useState(false)
  setLoginPage(true)
  const fetchFavoriteBooks = async () => {
    setLoading(true)
    try {
      const userId = localStorage.getItem('book-user-id')
      await getDocs(collection(db, userId))
        .then((res) =>
          res.docs.map((doc) => {
            let data = doc.data()
            return data
          })
        )
        .then((books) => {
          setUserFav(books)
          setLoading(false)
        })

      // console.log(userFav)
    } catch (error) {
      setLoading(false)

      // console.log(error.message)
    }
  }

  const handleDelete = async (id) => {
    const newBooks = userFav.filter((book) => book.id !== id)

    console.log(userId)
    console.log(id)
    const bookRef = doc(db, userId, id)

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'burlywood',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setUserFav(newBooks)
        setDelet(true)
        execute()
        Swal.fire({
          icon: 'success',
          title: 'Removed!',
          text: 'Book removed from favorites.',
          confirmButtonColor: 'burlywood',
        })
      }
    })
    const execute = async () => {
      await deleteDoc(bookRef)
    }
  }
  useEffect(() => {
    fetchFavoriteBooks()
  }, [])

  return (
    <div className='favorite' style={{ marginTop: '80px' }}>
      <h3 className='header'>Favorite Books</h3>
      {!loading ? (
        <div>
          <p
            style={{
              textAlign: 'center',
              marginTop: '20px',
              backgroundColor: 'burlywood',
              width: '70%',
              margin: '20px auto',
              borderRadius: '10px',
              padding: '10px',
            }}
          >
            You have {userFav.length} book{userFav.length > 1 && 's'} in your
            favorite
          </p>
          <div className='container'>
            {userFav.length > 0 ? (
              userFav.map((fav) => {
                const {
                  author,
                  title,
                  created_date,
                  book_image,
                  buy_links,
                  publisher,
                  description,
                  id,
                } = fav
                return (
                  <div className='fav-container'>
                    <div
                      className='img-container'
                      onClick={() => {
                        setBookRoute(title)
                        setSingleBook(fav)
                        navigate(`/book/${title}`)
                      }}
                    >
                      <img src={book_image} alt='' width={200} height={180} />
                    </div>
                    <div className='about'>
                      <h5>{title}</h5>
                      <h6 className='author'>By: {author}</h6>
                      <p>
                        Published by: {publisher}
                        {', '}
                        <span>Created at: {created_date}.</span>
                      </p>
                      <p style={{ textAlign: 'justify' }}>{description}</p>
                    </div>
                    <div className='delete'>
                      <MdDelete
                        size={25}
                        color='burlywood'
                        onClick={() => handleDelete(id)}
                      />
                    </div>
                  </div>
                )
              })
            ) : (
              <p
                style={{
                  textAlign: 'center',
                  marginTop: '20px',
                  backgroundColor: 'burlywood',
                  width: '70%',
                  margin: '20px auto',
                  borderRadius: '10px',
                  padding: '10px',
                }}
              >
                No book added to the favorite, kindly add to favorite from the
                home section
              </p>
            )}
          </div>
        </div>
      ) : (
        <div style={{ width: 40, margin: '20px auto' }}>
          <ReactLoading
            type='spinningBubbles'
            height={50}
            width={40}
            color='burlywood'
          />
        </div>
      )}
    </div>
  )
}

export default Favorite
