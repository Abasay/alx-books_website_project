import React, { useState } from 'react'
import geo1 from './login/geo1.png'
import './headpage.css'
import { useGlobalContext } from '../contexts/contextProvider'
import {
  AiFillHome,
  AiFillProfile,
  AiFillLike,
  AiFillBook,
  AiOutlineLogout,
} from 'react-icons/ai'
import { MdLibraryBooks, MdMenuBook, MdMenu, MdCancel } from 'react-icons/md'
import book1 from '../images/BOOKS (3).png'

const HeaderPage = () => {
  const [slide, setSlide] = useState(false)
  const { handleChangeAuth, signUp, handleLogout, header, handleBooks } =
    useGlobalContext()
  return (
    <div className='header'>
      {header ? (
        <div className='headerLanding'>
          <div
            className='img-container'
            style={{ borderRadius: '5px', padding: '10px', overflow: 'hidden' }}
          >
            {' '}
            <img
              src={book1}
              alt=''
              width={80}
              height={80}
              style={{ borderRadius: '5px' }}
            />
          </div>

          <div className='navs'>
            {/* <img
        src='https://th.bing.com/th/id/OIP.s6qkxOqsGKB_7JnvbKujWAHaE2?pid=ImgDet&rs=1'
        alt=''
        width={100}
        height={80}
      /> */}
            <div className='menu'>
              <MdMenu
                size={30}
                onClick={() => {
                  setSlide((slide) => !slide)
                }}
              />

              {/* <MdMenu
                size={30}
                onClick={() => {
                  setSlide((slide) => !slide)
                }}
              /> */}
            </div>
            <ul className={slide ? 'navList slidebar' : 'navList'}>
              <li id='menu'>
                <MdCancel
                  style={{
                    backgroundColor: 'white',
                    color: 'red',
                    marginLeft: '80%',
                  }}
                  size={30}
                  onClick={() => {
                    setSlide((slide) => !slide)
                  }}
                />
              </li>

              <li className='first' onClick={handleBooks}>
                {/* <AiFillHome size={22} /> */}
                <span>Home</span>
              </li>
              <li>
                {/* <AiFillProfile size={22} /> */}
                <span>My Profile</span>
              </li>
              <li>
                {/* <AiFillLike size={22} /> */}
                <span>Favorite</span>
              </li>

              <li>
                {/* <MdLibraryBooks size={22} /> */}
                <span> My Library</span>
              </li>
              <li className='logout' onClick={handleLogout}>
                {/* <AiOutlineLogout size={22} /> */}
                <span>Logout</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className='create'>
          <img src={geo1} alt='' width={70} height={70} />
          {signUp ? (
            <span>
              Already have an account ?{' '}
              <button onClick={handleChangeAuth}>Login</button>
            </span>
          ) : (
            <span>
              Don't have an account?{' '}
              <button onClick={handleChangeAuth}> Get Started</button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default HeaderPage
