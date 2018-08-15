'use strict'

const express = require('express')
const createDaemon = require('./src/daemon.js')

const allowedOrigins = [
  'http://localhost:1234',
  'https://cryptodepth.co'
]

const { PORT } = process.env

let daemon = createDaemon()
let app = express()

app.use((req, res, next) => {
  let reqOrigin = req.get('origin')
  if (allowedOrigins.includes(reqOrigin)) {
    res.set('access-control-allow-origin', reqOrigin)
  }
  next()
})

app.get('/assets', (req, res) => {
  daemon.then((values) => res.json(values))
})

let port = PORT || 8888
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
