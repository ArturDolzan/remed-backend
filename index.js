const express = require('express')
const app = express()
const db = require('./config/db')
const consign = require('consign')

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./routes')
    .into(app)

app.db = db

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Backend do Tuca executando...')
})

//app.listen(process.env.PORT);