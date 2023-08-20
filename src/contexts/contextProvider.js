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

  const navigate = useNavigate()

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
  // handleBookList()
  // async function execute() {

  //   fetch(url, options)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.text()
  //       }
  //       return response.text().then((err) => {
  //         return Promise.reject({
  //           status: response.status,
  //           statusText: response.statusText,
  //           errorMessage: err,
  //         })
  //       })
  //     })
  //     .then((data) => {
  //       const jsonData = JSON.parse(data)
  //       const categoryList = jsonData.results.lists
  //       setBookList(categoryList)
  //       console.log(bookList)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }
  // execute()

  const handleChangeAuth = () => {
    setSignUp((signUp) => !signUp)
  }
  const handleLogout = () => {
    setHeader((header) => !header)
    navigate('/')
  }
  const handleBooks = () => {
    navigate('/home')
    handleBookList()
    //execute()
  }
  const handleSignIn = () => {
    auth.createUserWithEmailAndPassword(details.email, details.password).then(
      function (user) {
        var user = firebase.auth().currentUser
        if (user.multiFactor.user.uid) {
          setSignUp((signUp) => !signUp)
          navigate('/homepage')
        } else {
          navigate('/login')
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
        setError(true)(function () {
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
            default:
              return 'other errors please check later'
          }
        })
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
          navigate('/homepage')
          setSignUp((signUp) => !signUp)
        } else {
          navigate('/login')
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
