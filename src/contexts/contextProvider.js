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
import Swal from 'sweetalert2'

const GlobalContext = createContext()

export const ContextProvider = ({ children }) => {
  //The context provider to define functions and props and allow easy passing of the functions and props
  const [details, setDetails] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    referrer: '',
    password: '',
    confirmPassword: '',
  })
  const [bookList, setBookList] = useState([])
  const [error, setError] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [header, setHeader] = useState(true)
  const [loader, setLoader] = useState(true)
  const [loading, setLoading] = useState(false)
  const [loginPage, setLoginPage] = useState(false)
  const [signedIn, setSignedIn] = useState(false)
  const [favorite, setFavorite] = useState('')
  const [singleBook, setSingleBook] = useState({})
  const [bookRoute, setBookRoute] = useState('')
  const [usersFavorite, setUsersFavorite] = useState([])

  //Assigning the useNavigate to a variable
  const navigate = useNavigate()

  const navToProfile = () => {
    //Function to navigate to profile page
    fetchFavoriteBooks()
    navigate('/myprofile')
  }
  const addToFavorite = (obj) => {
    //Function to add to favorites
    setFavorite((previous) => [...previous, obj])
  }

  const navToFavorite = () => {
    //Function to navigate to favorite page
    fetchFavoriteBooks()
    navigate('/favorite')
  }
  const sweetAlert = (
    iconText,
    titleText,
    textInput,
    bool,
    timerNum,
    bool1,
    bool3
  ) => {
    //Sweet alert default function
    Swal.fire({
      position: 'center',
      icon: iconText,
      title: titleText,
      text: textInput,
      showConfirmButton: true,
      confirmButtonColor: 'burlywood',
    })
  }

  const handleFavoriteBooks = async (bookObj) => {
    //Function to add to favorite and also check if book is already added or not
    const accessToken = localStorage.getItem('userAccessToken')
    try {
      setLoading(true)
      if (accessToken) {
        const userId = localStorage.getItem('book-user-id')
        const querySnapshot = await getDocs(collection(db, userId))

        const result = querySnapshot.docs.map((doc) => {
          const data = doc.data()
          return data
        })

        const checkBook = result.filter((res) => res.title === bookObj.title)
        if (checkBook.length === 1) {
          sweetAlert('error', 'Ooops', 'Book already added to Favrite')
        } else {
          const newBookRef = doc(collection(db, userId))

          await setDoc(newBookRef, { ...bookObj, id: newBookRef.id })
          sweetAlert('success', 'success', 'Book added to Favrite')
        }
        setLoading(false)
      } else {
        Swal.fire({
          title: 'Ooops, Sorry...',
          text: "You aren't logged in, login to save to favorite",
          icon: 'error',
          showCancelButton: true,
          confirmButtonColor: 'burlywood',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Log in',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Redirect!',
              text: 'You are being redirected to the login page',
              confirmButtonColor: 'burlywood',
              timer: 1500,
            })
            navigate('/auth')
          }
        })
      }
    } catch (error) {
      //error function
      setLoading(false)
      sweetAlert('error', 'Network Error', 'Please try again')
    }
  }

  const fetchFavoriteBooks = async () => {
    //Function to fetch the list of favorite books
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
      setLoader(false)
      console.log(error.message)
    }
  }

  const navToAbout = () => {
    //Navigate to about page
    navigate('/about')
  }
  const navToContact = () => {
    //Navigate to contact page
    navigate('/contact')
  }
  const handleChangeAuth = () => {
    //Change signup state
    setSignUp((signUp) => !signUp)
  }
  const handleLogInPage = () => {
    //Navigate to login page
    setLoginPage(false)
    navigate('/auth')
  }
  const handleLogout = () => {
    //Function to handle the logging out our users
    sweetAlert(
      'success',
      'Logged Out',
      'Bye, kindly login again to continue your explore!!!'
    )
    setLoginPage(false)
    setHeader(false)
    localStorage.removeItem('userAccessToken')
    localStorage.removeItem('user-email')
    localStorage.removeItem('book-user-id')
    navigate('/')
    setTimeout(() => {
      window.location.reload()
    }, 3000)
  }
  const handleBooks = () => {
    // navigate to home
    navigate('/home')
  }

  const handleSignIn = async () => {
    //Function to handle user's sign in
    if (
      details.email &&
      details.first_name &&
      details.last_name &&
      details.password &&
      details.phone_number &&
      details.password === details.confirmPassword
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
              sweetAlert(
                'success',
                'Login successful',
                'We wish you a wonderful explore'
              )
              navigate('/home')
            } else {
              sweetAlert('error', 'Ooops', 'Please try again')
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
                  sweetAlert(
                    'error',
                    'Weak Password',
                    'Password must not be less than 6 characters'
                  )
                  return error.code
                case 'auth/invalid-email':
                  sweetAlert(
                    'error',
                    'Invalid Email',
                    'please peovide a valid email'
                  )
                  return error.code
                case 'auth/network-request-failed':
                  sweetAlert(
                    'error',
                    'Network fail',
                    'You arre currently offline or have a poor internet connection'
                  )
                  return error.code
                case 'auth/email-already-in-use':
                  sweetAlert(
                    'error',
                    'Email already in use',
                    'Email address is already in use by another account.'
                  )

                  return error.code
                default:
                  sweetAlert('error', 'Unknown', 'Please try again')
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
      sweetAlert(
        'error',
        'Incomplete',
        'Some fields are not entered with appropriate values, please double check'
      )
    }
  }

  const handleLogin = () => {
    //Handle Logging users in
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
            sweetAlert(
              'success',
              'Login successful',
              'We wish you a wonderful explore'
            )
            navigate('/home')
          } else {
            sweetAlert('error', 'Ooops...', 'Please try again')
            navigate('/auth')
          }
        })
        .catch((error) => {
          setError(true)
          function errorChoice() {
            switch (error.code) {
              case 'auth/wrong-password':
                sweetAlert(
                  'error',
                  'Wrong Password',
                  'Wrong Password, please enter the correct password'
                )
                return error.code
              case 'auth/invalid-email':
                sweetAlert(
                  'error',
                  'User do not exist',
                  'No user with this email address attached'
                )
                return error.code
              case 'auth/user-not-found':
                sweetAlert(
                  'error',
                  'User do not exist',
                  'No user with this email address attached'
                )
                return error.code
              case 'auth/user-disabled':
                sweetAlert(
                  'error',
                  'Account disabled!!!',
                  'Your account has been disabled due to illegal actions perrformed on it'
                )

                return error.code
              default:
                sweetAlert(
                  'error',
                  'Server Error',
                  'Please check your network connectivity and try again!!!'
                )
            }
          }
          errorChoice()
        })
    } else {
      sweetAlert(
        'error',
        'Incomplete',
        'Some fields are not entered with appropriate values, please double check'
      )
    }
  }

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
        loading,
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
