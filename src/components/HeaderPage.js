import React, { useState } from 'react'
import './headpage.css'
import { useGlobalContext } from '../contexts/contextProvider'
import { MdLibraryBooks, MdMenuBook, MdMenu, MdCancel } from 'react-icons/md'
import book1 from '../images/BOOKS (3).png'
import { useNavigate } from 'react-router-dom'

const HeaderPage = () => {
  //Header Page Component to that displas the nav bars
  const [slide, setSlide] = useState(false)
  const navigate = useNavigate()
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
    navToFavorite,
  } = useGlobalContext()

  return (
    <div className='header' style={{ backgroundColor: 'burlywood' }}>
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
            style={{ borderRadius: '5px', cursor: 'pointer' }}
            onClick={() => navigate('/')}
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
                        backgroundColor: 'burlywood',
                        color: 'black',
                        marginLeft: '80%',
                      }}
                      size={30}
                      onClick={() => {
                        setSlide((slide) => !slide)
                      }}
                    />
                  </li>

                  <li onClick={() => navigate('/')}>
                    {/* <AiFillHome size={22} /> */}
                    <span>Home</span>
                  </li>
                  <li className='first' onClick={handleBooks}>
                    {/* <AiFillHome size={22} /> */}
                    <span>Library</span>
                  </li>

                  <li onClick={navToProfile}>
                    {/* <AiFillProfile size={22} /> */}
                    <span>My Profile</span>
                  </li>
                  <li onClick={navToFavorite}>
                    {/* <AiFillLike size={22} /> */}
                    <span>Favorite</span>
                  </li>

                  {/* <li>
                    <span> My Library</span>
                  </li> */}

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
                      backgroundColor: 'burlywood',
                      color: 'black',
                      marginLeft: '80%',
                    }}
                    size={30}
                    onClick={() => {
                      setSlide((slide) => !slide)
                    }}
                  />
                </li>
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
