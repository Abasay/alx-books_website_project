var express = require('express')
var router = express.Router()

const url =
  'https://api.nytimes.com/svc/books/v3/lists/overview.json?&api-key=RUnW3vOenNDvoKKbJ3rMBmGTy6prxnV1'

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
}

/* GET best sellers books listing. */
router.get('/', async function (req, res, next) {
  try {
    await fetch(url, options)
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp.results.lists)
        res.send(resp.results.lists)
      })
  } catch (error) {
    console.log('Bad Network Connection')
  }
})

module.exports = router
