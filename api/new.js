// var express = require('express')
// var path = require('path')

require('dotenv').config({ path: './TEST.env' })

console.log('PORT:', process.env.PORT)
console.log('DATABASE_URL:', process.env.DATABASE_URL)
console.log('DATABASE_PASSWORD:', process.env.DATABASE_PASSWORD)
console.log('EMAIL_ID:', process.env.EMAIL_ID)
console.log('STRIPE_API_KEY:', process.env.STRIPE_API_KEY)
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD)

console.log('API KEY:', process.env.API_KEY)

exports.port = process.env.PORT
