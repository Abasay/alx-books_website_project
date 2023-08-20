import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import auth from '../firebase'
import { LOGIN_REQUEST } from './reducers/actionTypes'
import { useGlobalContext } from '../contexts/contextProvider'

export const signIn = () => async (dispatch) => {
  const { details } = useGlobalContext()
  const { email, password } = details
  try {
    dispatch({ type: LOGIN_REQUEST })
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        function (user) {
          var user = firebase.auth().currentUser
          console.log(user) // Optional
        },
        function (error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          console.log(errorMessage)
        }
      )

    // const res = await createUserWithEmailAndPassword(
    //   auth,
    //   email,
    //   password
    // ).then((userCredential) => {
    //   const user = userCredential.user
    //   return user
    // })
    console.log()
  } catch (error) {
    console.log(error)
  }
}
