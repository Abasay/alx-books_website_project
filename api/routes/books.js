var express = require('express')
var router = express.Router()

const url =
  'https://api.nytimes.com/svc/books/v3/lists//full-overview.json?&api-key=RUnW3vOenNDvoKKbJ3rMBmGTy6prxnV1'

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
  },
}

/* GET books listing. */
router.get('/', async function (req, res, next) {
  try {
    await fetch(url, options)
      .then((resp) => resp.json())
      .then((respo) => res.send(respo))
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = router
