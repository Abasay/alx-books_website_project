import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import auth, { db } from '../firebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
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
  const [singleBook, setSingleBook] = useState({})
  const [bookRoute, setBookRoute] = useState('')
  const [usersFavorite, setUsersFavorite] = useState([])

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
    fetchFavoriteBooks()
    navigate('/myprofile')
  }
  const addToFavorite = (obj) => {
    setFavorite((previous) => [...previous, obj])
  }

  const navToFavorite = () => {
    fetchFavoriteBooks()
    navigate('/favorite')
  }

  const handleFavoriteBooks = async (bookObj) => {
    setLoader(true)
    try {
      const userId = localStorage.getItem('book-user-id')
      const querySnapshot = await getDocs(collection(db, userId))

      const result = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return data
      })

      const checkBook = result.filter((res) => res.title === bookObj.title)
      if (checkBook.length === 1) {
        alert('Book already added to Favorite')
      } else {
        const newBookRef = doc(collection(db, userId))

        await setDoc(newBookRef, { ...bookObj, id: newBookRef.id })
        alert('Book added to your favorite')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const fetchFavoriteBooks = async () => {
    setLoader(true)
    try {
      const userId = localStorage.getItem('book-user-id')
      const querySnapshot = await getDocs(collection(db, userId))

      const result = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return data
      })
      setTimeout(() => {
        setUsersFavorite(result)
        setLoader(false)
        console.log(usersFavorite)
      }, 5000)
    } catch (error) {
      console.log(error.message)
    }
  }

  // useEffect(() => {
  //   //setUsrersFavorite useEffect
  //   fetchFavoriteBooks()
  //   setUsersFavorite(usersFavorite)
  // }, [usersFavorite])

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
    localStorage.removeItem('user-id')
    localStorage.removeItem('userAccessToken')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userProfile')
    localStorage.removeItem('newArr')
    localStorage.removeItem('user-email')
    localStorage.removeItem('book-user-id')
    localStorage.removeItem('products')
    navigate('/')
    window.location.reload()
  }
  const handleBooks = () => {
    // handleBookList()
    navigate('/home')

    //execute()
  }

  const handleSignIn = async () => {
    if (
      details.email &&
      details.first_name &&
      details.last_name &&
      details.password &&
      details.phone_number
    ) {
      auth
        .createUserWithEmailAndPassword(details.email, details.password)
        .then(
          function (user) {
            var user = firebase.auth().currentUser
            localStorage.setItem('book-user-id', user.multiFactor.user.uid)
            localStorage.setItem('user-email', user.multiFactor.user.email)
            localStorage.setItem(
              'userAccessToken',
              user.multiFactor.user.accessToken
            )
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
                  alert(
                    'The email address is already in use by another account.'
                  )
                  return error.code
                default:
                  return 'other errors please check later'
              }
            }
            errorFunction()
          }
        )
        .then(async () => {
          const userEmail = localStorage.getItem('user-email')
          if (userEmail) {
            const userRef = doc(collection(db, userEmail))
            localStorage.setItem('user-id', userRef.id)
            await setDoc(userRef, { ...details })
          }
        })
    } else {
      alert('Please enter all the required fields')
    }

    // setTimeout(() => {
    //   setError(false)
    // }, 3000)
  }

  const handleLogin = () => {
    //Handle Login
    if (details.email && details.password) {
      auth
        .signInWithEmailAndPassword(details.email, details.password)
        .then((user) => {
          var user = firebase.auth().currentUser
          // user.displayName = details.first_name
          localStorage.setItem(
            'userAccessToken',
            user.multiFactor.user.accessToken
          )
          localStorage.setItem('book-user-id', user.multiFactor.user.uid)
          localStorage.setItem('user-email', user.multiFactor.user.email)
          console.log(user.multiFactor.user.uid)

          console.log(user)
          localStorage.setItem('book-user-id', user.multiFactor.user.uid)
          if (user.multiFactor.user.uid) {
            setSignUp((signUp) => !signUp)
            setHeader(true)
            setSignedIn(true)
            setLoginPage(true)
            // handleBookList()
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
    } else {
      alert('Please enter all the required fields')
    }
  }
  // useEffect(() => {
  //   setTimeout(() => {
  //     setError(false)
  //   }, 3000)
  // }, [error])
  // useEffect(() => {
  //   handleBookList()
  // }, [loader])

  useEffect(() => {
    setBookRoute(bookRoute)
  }, [bookRoute])
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

        setLoginPage,
        handleLogInPage,
        navToAbout,
        navToContact,
        addToFavorite,
        navToProfile,
        setSingleBook,
        singleBook,
        bookRoute,
        setBookRoute,
        handleFavoriteBooks,
        fetchFavoriteBooks,
        navToFavorite,
        setUsersFavorite,
        setBookList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
