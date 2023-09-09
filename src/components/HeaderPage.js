import React, { useState } from 'react'
import geo1 from './login/geo1.png'
import './headpage.css'
import { useGlobalContext } from '../contexts/contextProvider'
import { MdLibraryBooks, MdMenuBook, MdMenu, MdCancel } from 'react-icons/md'
import book1 from '../images/BOOKS (3).png'

const HeaderPage = () => {
  const [slide, setSlide] = useState(false)
  const {
    handleChangeAuth,
    signUp,
    handleLogout,
    header,
    handleBooks,
    loginPage,
    signedIn,
    handleLogInPage,
    navToAbout,
    navToContact,
    navToProfile,
  } = useGlobalContext()
  //Retrieve the user's details from localstorage and set some headers to false if d dettails are true

  return (
    <div className='header'>
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
        {loginPage ? (
          <div>
            {header && (
              <div className='navs'>
                <div className='menu'>
                  <MdMenu
                    size={30}
                    onClick={() => {
                      setSlide((slide) => !slide)
                    }}
                  />
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
                  <li onClick={navToProfile}>
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
            )}
          </div>
        ) : (
          <div className='logOutHeader'>
            {' '}
            <div className='navs'>
              <ul className={slide ? 'navList slidebar' : 'navList'}>
                {signedIn || (
                  <li onClick={navToAbout}>
                    {/* <AiFillProfile size={22} /> */}
                    <span>About</span>
                  </li>
                )}
                {signedIn || (
                  <li onClick={navToContact}>
                    {/* <AiFillProfile size={22} /> */}
                    <span>Contact</span>
                  </li>
                )}
                {signedIn || (
                  <li onClick={handleLogInPage}>
                    {/* <AiFillProfile size={22} /> */}
                    <span>Sign in or Create an account</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeaderPage
