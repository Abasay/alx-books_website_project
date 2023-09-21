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
import ErrorPage from './components/pages/ErrorPage'
import BestSelling from './components/pages/BestSelling'
import FetchingCategory from './components/pages/FetchingCategory'

const Landing = () => {
  //Landing Page and Header Page combined fr easy render
  return (
    <div>
      <HeaderPage />
      <LandingPage />
    </div>
  )
}

const HandleHome = () => {
  //Handle Homepage with extra features from the App file
  const { loader, bookList } = useGlobalContext()
  return <HomePage />
}
const App = () => {
  //App Component to handle all Other Components
  const { signUp, bookRoute, fetchNav } = useGlobalContext()
  return (
    <div className='app'>
      {/* You should have a general header */}
      <HeaderPage />
      <Routes>
        <Route path='/library/best-selling-books' element={<BestSelling />} />
        <Route path='/library' element={<HandleHome />} />
        <Route path='/contact' element={<Contact />} />
        <Route path={`/book/${bookRoute}`} element={<SingleBook />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/about' element={<About />} />
        <Route path='/auth' element={<LoginPage />} />
        <Route path='/myprofile' element={<MyProfile />} />
        <Route
          path={`/library/category/${fetchNav}`}
          element={<FetchingCategory />}
        />
        <Route path='/' element={<Landing />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App
