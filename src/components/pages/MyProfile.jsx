import { collection, doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import './page.scss'
import { db } from '../../firebase'
import { useGlobalContext } from '../../contexts/contextProvider'
import { useNavigate } from 'react-router-dom'

const MyProfile = () => {
  const { setLoginPage } = useGlobalContext()

  const navigate = useNavigate()

  const accessToken = localStorage.getItem('userAccessToken')
  if (!accessToken) {
    setLoginPage(false)
    alert('Access denied, please login or signup')
    navigate('/auth')
  }
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({})
  setLoginPage(true)
  const fetchProfile = async () => {
    setLoading(true)
    try {
      const userEmail = localStorage.getItem('user-email')
      const userId = localStorage.getItem('user-id')
      const docRef = doc(db, userEmail, userId)

      await getDoc(docRef)
        .then((response) => response.data())
        .then((res) => {
          setProfile(res)
          console.log(profile)
        })
    } catch (error) {
      console.log(error.message)
    }
  }
  console.log(profile)
  useEffect(() => {
    fetchProfile()
  }, [])

  const { first_name, last_name, email, phone_number, referrer } = profile
  return (
    <div style={{ marginTop: '80px' }} className='profile'>
      <h4>Profile</h4>
      <h5>First Name: </h5>
      <p>{first_name}</p>
      <h5> Last Name:</h5>
      <p>{last_name}</p>
      <h5>Email: </h5>
      <p>{email}</p>
      <h5>Phone Number:</h5>
      <p>{phone_number}</p>
      <h5>Referrer:</h5>
      <p>{referrer}</p>
    </div>
  )
}

export default MyProfile
// {
//   const client_id =
//     '949071760081-4oi7544ujbkbp189u25n795n28umdldv.apps.googleusercontent.com'
//   const apiKey = 'AIzaSyCn66yVAJ6u8-JZEBaBV7eX2QB-SwnGhAo'

//   const client = filestack.init('ATGSFyd4ToOzaG39GOLprz')
//   const [file, setFiles] = useState(null)
//   const [upload, setUpload] = useState('')

//   const handleSelect = () => {
//     const input = document.createElement('input')
//     input.type = 'file'

//     input.onchange = (e) => {
//       let files = e.target.files
//       setFiles(files)
//       const reader = new FileReader()
//       reader.onload = function () {
//         return <img src={reader.src} alt='reader' />
//       }
//       reader.readAsDataURL(files[0])
//     }
//     input.click()
//   }

//   const handleUpload = () => {
//     const imageName = 'newFile'
//     let uploadTask = storageRef.ref(`Images/${imageName}.png`).put(file[0])
//     uploadTask.on(
//       'state_changed',
//       function (snapshot) {
//         let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         setUpload(`Upload ${progress}%`)
//       },
//       function (err) {
//         alert('error in uploading')
//       },
//       function () {
//         uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
//           const imgUrl = url
//           database.ref(`Pictures/${imageName}`).set({
//             Name: imageName,
//             Link: imgUrl,
//           })
//           alert('image added success')
//         })
//       }
//     )
//   }
//   const handleList = () => {
//     const newStorage = storageRef.ref().child('images/background_1.jpg')
//     console.log(newStorage.bucket)

//     newStorage
//       .getDownloadURL()
//       .then((url) => {
//         console.log(url)
//         // Insert url into an <img> tag to "download"
//       })
//       .catch((error) => {
//         // A full list of error codes is available at
//         // https://firebase.google.com/docs/storage/web/handle-errors
//         switch (error.code) {
//           case 'storage/object-not-found':
//             // File doesn't exist
//             break
//           case 'storage/unauthorized':
//             console.log('doesnt have permission to access the object')
//             break
//           case 'storage/canceled':
//             // User canceled the upload
//             break

//           // ...

//           case 'storage/unknown':
//             // Unknown error occurred, inspect the server response
//             break
//           default:
//             return 'good'
//         }
//       })
//     // newStorage
//     //   .listAll()
//     //   .then(function (res) {
//     //     console.log(res)
//     //   })
//     //   .catch(function (err) {
//     //     console.log(err)
//     //   })
//   }
// }
