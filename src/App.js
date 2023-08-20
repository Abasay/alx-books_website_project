import React from 'react'
import LoginPage from './components/login/LoginPage'
import './App.css'
import HeaderPage from './components/HeaderPage'
import { Routes, Route, Switch, useNavigate } from 'react-router-dom'
import { useGlobalContext } from './contexts/contextProvider'
import Home, { RenderHome } from './components/home/Home'
import Sidebar from './components/sidebars/Sidebar'
import Footer from './components/footer/Footer'
import HomePage from './components/home/HomePage'
import Loading from './components/home/Loading'

const LoginOrSignUp = () => {
  return (
    <>
      {/* <HeaderPage /> */}
      <LoginPage />
    </>
  )
}
const NHomePage = () => {
  return (
    <div className='home'>
      <Home />
      {/* <Footer /> */}
    </div>
  )
}

const HandleHome = () => {
  const { loader, bookList } = useGlobalContext()
  if (loader) {
    return <Loading />
  }
  if (bookList.length > 1) {
    return <HomePage />
  }
}
const App = () => {
  const { signUp } = useGlobalContext()
  return (
    <div className='app'>
      <HeaderPage />
      <Routes>
        <Route path='/homepage' element={<NHomePage />} />
        <Route path='/home' element={<HandleHome />} />
        <Route path='/' element={<LoginPage />} />
        {/* <Route path='/' element={<LoginPage />} /> */}
      </Routes>
      <Footer />
    </div>
  )
}

export default App
