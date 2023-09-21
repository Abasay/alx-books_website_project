var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const https = require('https')
var cors = require('cors')
var bodyParser = require('body-parser')

//Routers
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var booksRouter = require('./routes/books')
var bestSellingBooks = require('./routes/best-sellers')

// require('dotenv').config({ path: './TEST.env' })

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/books', booksRouter)
app.use('/best-selling-books', bestSellingBooks)

let newCategory = ''
app.post('/books-category', async (req, res) => {
  //post book category type
  const { bookCategory } = req.body
  newCategory = bookCategory
})

app.get('/book-category', async (req, res, next) => {
  //Handle Books category requests
  const url = `https://api.nytimes.com/svc/books/v3//lists/current/hardcover-fiction.json?&api-key=RUnW3vOenNDvoKKbJ3rMBmGTy6prxnV1`
  console.log(url)
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }

  try {
    await fetch(url, options)
      .then((resp) => {
        resp.json()
      })
      .then((result) => {
        console.log(result)
        res.send(result)
      })
  } catch (error) {
    console.log(error.message)
  }
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
