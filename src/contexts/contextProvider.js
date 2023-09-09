import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import auth from '../firebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const GlobalContext = createContext()

export const ContextProvider = ({ children }) => {
  const [details, setDetails] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    referrer: '',
    password: '',
  })
  const [bookList, setBookList] = useState([])
  const [error, setError] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [header, setHeader] = useState(true)
  const [loader, setLoader] = useState(true)
  const [loginPage, setLoginPage] = useState(false)
  const [signedIn, setSignedIn] = useState(false)
  const [favorite, setFavorite] = useState('')

  const objTemp = {
    list_name: '',
    books: {
      author: '',
      book_image: '',
      description: '',
      title: '',
      book_uri: '',
      amazon_product_url: '',
      rank: '',
    },
  }
  const navigate = useNavigate()

  const navToProfile = () => {
    navigate('/myprofile')
  }
  const addToFavorite = (obj) => {
    setFavorite((previous) => [...previous, obj])
  }

  //USE EFFECT FOR THE FAVORITES
  useEffect(() => {
    setFavorite(favorite)
    console.log(favorite)
  }, [favorite])

  const handleBookList = async () => {
    setLoader(true)
    try {
      const url =
        'https://api.nytimes.com/svc/books/v3/lists//full-overview.json?&api-key=RUnW3vOenNDvoKKbJ3rMBmGTy6prxnV1'
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
      const response = await fetch(url, options)
      const data = await response.json()
      console.log(data)
      setBookList(data.results.lists)
      console.log(data.results.lists)
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log(error.message)
    }
  }

  const navToAbout = () => {
    navigate('/about')
  }
  const navToContact = () => {
    navigate('/contact')
  }
  const handleChangeAuth = () => {
    setSignUp((signUp) => !signUp)
  }
  const handleLogInPage = () => {
    setLoginPage(false)
    navigate('/auth')
  }
  const handleLogout = () => {
    setLoginPage(false)
    setHeader(false)
    navigate('/')
    window.location.reload()
  }
  const handleBooks = () => {
    handleBookList()
    navigate('/home')

    //execute()
  }
  const tempHandleLogIN = () => {
    handleBookList()
    setSignUp((signUp) => !signUp)
    setHeader(true)
    setSignedIn(true)
    setLoginPage(true)
    navigate('/home')
  }
  const handleSignIn = () => {
    auth.createUserWithEmailAndPassword(details.email, details.password).then(
      function (user) {
        var user = firebase.auth().currentUser
        if (user.multiFactor.user.uid) {
          setSignUp((signUp) => !signUp)
          setHeader(true)
          setSignedIn(true)
          setLoginPage(true)
          navigate('/home')
        } else {
          navigate('/auth')
        }
        console.log(user) // Optional
      },
      function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        console.log(errorMessage)
        // setError(true)
        // setErrorMsg(errorMessage)
        setError(true)
        function errorFunction() {
          switch (error.code) {
            case 'auth/weak-password':
              // setErrorMsg(
              //   'weak password, password should be at least six characters'
              // )
              alert('The password is too weak.')
              return error.code
            case 'auth/invalid-email':
              // setErrorMsg('Thrown if the email address is not valid')
              alert('Invalid Email address, please peovide a valid email.')
              return error.code
            case 'auth/network-request-failed':
              alert('Please check your network connection')
              return error.code
            case 'auth/email-already-in-use':
              alert('The email address is already in use by another account.')
              return error.code
            default:
              return 'other errors please check later'
          }
        }
        errorFunction()
      }
    )

    setTimeout(() => {
      setError(false)
    }, 3000)
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(details.email, details.password)
      .then((user) => {
        var user = firebase.auth().currentUser
        // user.displayName = details.first_name
        console.log(user.multiFactor.user.uid)
        if (user.multiFactor.user.uid) {
          setSignUp((signUp) => !signUp)
          setHeader(true)
          setSignedIn(true)
          setLoginPage(true)
          handleBookList()
          navigate('/home')
        } else {
          navigate('/auth')
        }
      })
      .catch((error) => {
        setError(true)
        function errorChoice() {
          switch (error.code) {
            case 'auth/wrong-password':
              // setErrorMsg('wrong username/password')
              alert('wrong username/password.')
              return error.code
            case 'auth/invalid-email':
              // setErrorMsg('Thrown if the email address is not valid')
              alert('Invalid Email address, please peovide a valid email.')
              return error.code
            case 'auth/user-not-found':
              // setErrorMsg('no user corresponding to the given email.')
              alert('no user corresponding to the given email.')
              return error.code
            case 'auth/user-disabled':
              // setErrorMsg(
              //   'your account is disabled due to illegal actions perrformed on it'
              // )
              alert(
                'your account is disabled due to illegal actions perrformed on it'
              )
              return error.code
            default:
              return error.code
          }
        }
        errorChoice()
      })
  }
  // useEffect(() => {
  //   setTimeout(() => {
  //     setError(false)
  //   }, 3000)
  // }, [error])
  // useEffect(() => {
  //   handleBookList()
  // }, [loader])
  return (
    <GlobalContext.Provider
      value={{
        details,
        setDetails,
        signUp,
        handleChangeAuth,
        handleSignIn,
        handleLogin,
        error,
        handleLogout,
        header,
        setHeader,
        handleBooks,
        bookList,
        loader,
        loginPage,
        signedIn,
        tempHandleLogIN,
        setLoginPage,
        handleLogInPage,
        navToAbout,
        navToContact,
        addToFavorite,
        navToProfile,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
