import React from 'react'
import LoginPage from './components/login/LoginPage'
import './App.css'
import HeaderPage from './components/HeaderPage'
import { Routes, Route, Switch, useNavigate } from 'react-router-dom'
import { useGlobalContext } from './contexts/contextProvider'
import LandingPage from './components/home/LandingPage'
import Footer from './components/footer/Footer'
import HomePage from './components/home/HomePage'
import Loading from './components/home/Loading'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import MyProfile from './components/pages/MyProfile'
import SingleBook from './components/pages/SingleBook'
import Favorite from './components/pages/Favorite'

const LoginOrSignUp = () => {
  return (
    <>
      {/* <HeaderPage /> */}
      <LoginPage />
    </>
  )
}
const Landing = () => {
  return (
    <div>
      <HeaderPage />
      <LandingPage />
    </div>
  )
}

const HandleHome = () => {
  const { loader, bookList } = useGlobalContext()

  // if (loader) {
  //   return <Loading />
  // }
  // if (bookList.length > 1) {
  //   return <HomePage />
  // }
  return <HomePage />
}
const App = () => {
  const { signUp, bookRoute } = useGlobalContext()
  return (
    <div className='app'>
      {/* You should have a general header */}
      <HeaderPage />
      <Routes>
        <Route path='/home' element={<HandleHome />} />
        <Route path='/contact' element={<Contact />} />
        <Route path={`/book/${bookRoute}`} element={<SingleBook />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/about' element={<About />} />
        <Route path='/auth' element={<LoginPage />} />
        <Route path='/myprofile' element={<MyProfile />} />
        <Route path='/' element={<Landing />} />
        {/* <Route path='/' element={<LoginPage />} /> */}
      </Routes>
      <Footer />
    </div>
  )
}

export default App
