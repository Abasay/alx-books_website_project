// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/storage'
import { getFirestore } from 'firebase/firestore'

import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBLjucywjINL6v1yZME1U1FFu-kbr36nPg',
  authDomain: 'geotopup.firebaseapp.com',
  projectId: 'geotopup',
  storageBucket: 'gs://geotopup.appspot.com',
  messagingSenderId: '113986617549',
  appId: '1:113986617549:web:03e43580e2e2ecb9a46984',
  measurementId: 'G-RH5VSHWKP5',
  databaseURL: 'https://geotopup-default-rtdb.firebaseio.com',
}

// // Initialize Firebase

// const firebaseConfig = {
//   apiKey: 'AIzaSyCfnBcPzdQvk7IfpQSLm7E-fBX6ma7CqCs',
//   authDomain: 'test-2ece4.firebaseapp.com',
//   projectId: 'test-2ece4',
//   storageBucket: 'test-2ece4.appspot.com',
//   messagingSenderId: '337257211357',
//   appId: '1:337257211357:web:3b83d9c6470d326cdc0234',
//   measurementId: 'G-FPBDBBC4PP',
// }

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
export const database = firebase.database()
export const storageRef = firebase.storage()
export const db = getFirestore(app)
// const analytics = getAnalytics(app)
export default auth
