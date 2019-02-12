const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const startIO = require('../server/io')

function startServer () {
  // Start client hosting.
  app.use(express.static('client'))
  // Start IO
  startIO(io)
  // Spin up the server.
  http.listen(3000, function () {
    console.log('Listening on localhost:3000')
  })
}

module.exports = startServer
