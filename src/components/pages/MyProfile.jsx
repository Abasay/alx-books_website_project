import React, { useState } from 'react'
import { Client } from 'filestack-js'
import * as filestack from 'filestack-js'
import img from '../illustration_register.png'
import { storageRef, database } from '../../firebase'

// import { promises } from 'fs'
// import path from 'path'
// import process from 'process'
// import { authenticate } from '@google-cloud/local-auth'
// import { google } from 'googleapis'
// import { readFile, writeFile } from 'fs'

const MyProfile = () => {
  const client_id =
    '949071760081-4oi7544ujbkbp189u25n795n28umdldv.apps.googleusercontent.com'
  const apiKey = 'AIzaSyCn66yVAJ6u8-JZEBaBV7eX2QB-SwnGhAo'

  const client = filestack.init('ATGSFyd4ToOzaG39GOLprz')
  const [file, setFiles] = useState(null)
  const [upload, setUpload] = useState('')

  const handleSelect = () => {
    const input = document.createElement('input')
    input.type = 'file'

    input.onchange = (e) => {
      let files = e.target.files
      setFiles(files)
      const reader = new FileReader()
      reader.onload = function () {
        return <img src={reader.src} alt='reader' />
      }
      reader.readAsDataURL(files[0])
    }
    input.click()
  }

  const handleUpload = () => {
    const imageName = 'newFile'
    let uploadTask = storageRef.ref(`Images/${imageName}.png`).put(file[0])
    uploadTask.on(
      'state_changed',
      function (snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setUpload(`Upload ${progress}%`)
      },
      function (err) {
        alert('error in uploading')
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
          const imgUrl = url
          database.ref(`Pictures/${imageName}`).set({
            Name: imageName,
            Link: imgUrl,
          })
          alert('image added success')
        })
      }
    )
  }
  const handleList = () => {
    const newStorage = storageRef.ref().child('images/background_1.jpg')
    console.log(newStorage.bucket)

    newStorage
      .getDownloadURL()
      .then((url) => {
        console.log(url)
        // Insert url into an <img> tag to "download"
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break
          case 'storage/unauthorized':
            console.log('doesnt have permission to access the object')
            break
          case 'storage/canceled':
            // User canceled the upload
            break

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break
          default:
            return 'good'
        }
      })
    // newStorage
    //   .listAll()
    //   .then(function (res) {
    //     console.log(res)
    //   })
    //   .catch(function (err) {
    //     console.log(err)
    //   })
  }
  return (
    <div style={{ marginTop: '100px' }}>
      {/* <button onClick={handleSelect}>select</button>
      <button onClick={handleUpload}>upload</button> */}
      <button onClick={handleList}>list</button>
      <form action=''>
        <label htmlFor=''>Upload file</label>
        <input type='file' name='audio' id='' />
      </form>
    </div>
  )
}

export default MyProfile
