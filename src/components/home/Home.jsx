import React, { useState } from 'react'
import { useCallback } from 'react'
import { useGlobalContext } from '../../contexts/contextProvider'
import { json } from 'react-router-dom'
import './home.css'
import Sidebar from '../sidebars/Sidebar'

const Home = () => {
  const { details } = useGlobalContext()
  const [showText, setShowText] = useState(false)
  const fetchBooks = async () => {
    const params = {
      mode: 'no-cors',
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    }
    const google =
      'https://www.googleapis.com/auth/books/key=AIzaSyCn66yVAJ6u8-JZEBaBV7eX2QB-SwnGhAo'
    const url =
      'https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=RUnW3vOenNDvoKKbJ3rMBmGTy6prxnV1'

    const response = await fetch(url)
      .then((response) => {
        console.log(response)
      })
      .then((res) => {
        console.log(res)
      })

    console.log(response)
  }

  // fetchBooks()
  // function execute() {
  //   const url =
  //     'https://api.nytimes.com/svc/books/v3/lists//full-overview.json?&api-key=RUnW3vOenNDvoKKbJ3rMBmGTy6prxnV1'
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //     },
  //   }
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
  //       const bookList = jsonData.results.lists
  //       console.log(bookList)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }

  // execute()

  const handleText = () => {
    setShowText((showText) => !showText)
  }

  return (
    <div className='books'>
      {/* <div className='heading'>some headings</div> */}
      {/* <div id='ourBooks'>
        <div className='card'>
          <div className='img-container'>
            <img
              src='https://storage.googleapis.com/du-prd/books/images/9780063327528.jpg'
              alt=''
              // width={150}
              // height={200}
            />
          </div>

          <div className='info'>
            <span>TOM LAKE by Ann Patchett</span>

            <h4>rank: 1</h4>
            <p>
              Three daughters, who return to their
              {showText ? (
                <span>
                  family orchard in the spring of 2020, learn about their
                  mother’s relationship with a famous actor.{' '}
                  <span id='hide' onClick={handleText}>
                    hide
                  </span>
                </span>
              ) : (
                <span id='show' onClick={handleText}>
                  {' '}
                  Show more...
                </span>
              )}
            </p>
            <p>Buy links: </p>
          </div>
        </div>
        <div className='card'>
          <div className='img-container'>
            <img
              src='https://storage.googleapis.com/du-prd/books/images/9780063327528.jpg'
              alt=''
              // width={150}
              // height={200}
            />
          </div>

          <div className='info'>
            <span>TOM LAKE by Ann Patchett</span>

            <h4>rank: 1</h4>
            <p>
              Three daughters, who return to their
              {showText ? (
                <span>
                  family orchard in the spring of 2020, learn about their
                  mother’s relationship with a famous actor.{' '}
                  <span id='hide' onClick={handleText}>
                    hide
                  </span>
                </span>
              ) : (
                <span id='show' onClick={handleText}>
                  {' '}
                  Show more...
                </span>
              )}
            </p>
            <p>Buy links: </p>
          </div>
        </div>
        <div className='card'>
          <div className='img-container'>
            <img
              src='https://storage.googleapis.com/du-prd/books/images/9780063327528.jpg'
              alt=''
              // width={150}
              // height={200}
            />
          </div>

          <div className='info'>
            <span>TOM LAKE by Ann Patchett</span>

            <h4>rank: 1</h4>
            <p>
              Three daughters, who return to their
              {showText ? (
                <span>
                  family orchard in the spring of 2020, learn about their
                  mother’s relationship with a famous actor.{' '}
                  <span id='hide' onClick={handleText}>
                    hide
                  </span>
                </span>
              ) : (
                <span id='show' onClick={handleText}>
                  {' '}
                  Show more...
                </span>
              )}
            </p>
            <p>Buy links: </p>
          </div>
        </div>
        <div className='card'>
          <div className='img-container'>
            <img
              src='https://storage.googleapis.com/du-prd/books/images/9780063327528.jpg'
              alt=''
              // width={150}
              // height={200}
            />
          </div>

          <div className='info'>
            <span>TOM LAKE by Ann Patchett</span>

            <h4>rank: 1</h4>
            <p>
              Three daughters, who return to their
              {showText ? (
                <span>
                  family orchard in the spring of 2020, learn about their
                  mother’s relationship with a famous actor.{' '}
                  <span id='hide' onClick={handleText}>
                    hide
                  </span>
                </span>
              ) : (
                <span id='show' onClick={handleText}>
                  {' '}
                  Show more...
                </span>
              )}
            </p>
            <p>Buy links: </p>
          </div>
        </div>
        <div className='card'>
          <div className='img-container'>
            <img
              src='https://storage.googleapis.com/du-prd/books/images/9780063327528.jpg'
              alt=''
              // width={150}
              // height={200}
            />
          </div>

          <div className='info'>
            <span>TOM LAKE by Ann Patchett</span>

            <h4>rank: 1</h4>
            <p>
              Three daughters, who return to their
              {showText ? (
                <span>
                  family orchard in the spring of 2020, learn about their
                  mother’s relationship with a famous actor.{' '}
                  <span id='hide' onClick={handleText}>
                    hide
                  </span>
                </span>
              ) : (
                <span id='show' onClick={handleText}>
                  {' '}
                  Show more...
                </span>
              )}
            </p>
            <p>Buy links: </p>
          </div>
        </div>
        <div className='card'>
          <div className='img-container'>
            <img
              src='https://storage.googleapis.com/du-prd/books/images/9780063327528.jpg'
              alt=''
              // width={150}
              // height={200}
            />
          </div>

          <div className='info'>
            <span>TOM LAKE by Ann Patchett</span>

            <h4>rank: 1</h4>
            <p>
              Three daughters, who return to their
              {showText ? (
                <span>
                  family orchard in the spring of 2020, learn about their
                  mother’s relationship with a famous actor.{' '}
                  <span id='hide' onClick={handleText}>
                    hide
                  </span>
                </span>
              ) : (
                <span id='show' onClick={handleText}>
                  {' '}
                  Show more...
                </span>
              )}
            </p>
            <p>Buy links: </p>
          </div>
        </div>
        <div className='card'>
          <div className='img-container'>
            <img
              src='https://storage.googleapis.com/du-prd/books/images/9780063327528.jpg'
              alt=''
              // width={150}
              // height={200}
            />
          </div>

          <div className='info'>
            <span>TOM LAKE by Ann Patchett</span>

            <h4>rank: 1</h4>
            <p>
              Three daughters, who return to their
              {showText ? (
                <span>
                  family orchard in the spring of 2020, learn about their
                  mother’s relationship with a famous actor.{' '}
                  <span id='hide' onClick={handleText}>
                    hide
                  </span>
                </span>
              ) : (
                <span id='show' onClick={handleText}>
                  {' '}
                  Show more...
                </span>
              )}
            </p>
            <p>Buy links: </p>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Home

// export const RenderHome = () => {
//   return (
//     <div className='renders'>
//       <div className='side'>
//         <Sidebar />
//       </div>

//       <Home />
//     </div>
//   )
// }
