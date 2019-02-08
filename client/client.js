let socket = io()

let gameData = null
let myId = null

socket.on('connect', function() {
  console.log('Connected with id ', socket.id)
  myId = socket.id
})

socket.on('connectToRoom', function(data) {
  document.getElementById('room').textContent = data
  console.log('Successfully connected to room nr.: ', data)
})

socket.on('leftRoom', function(data) {
  console.log('Successfully left room nr.: ', data)
})

socket.on('roomsData', function(data) {
  console.log('roomsData', data)
  gameData = data
  createStructure(data)
})

socket.on('nonBreakingError', function(data) {
  console.warn(data)
})

function createStructure(data) {
  let container = document.getElementById('rooms')
  container.innerHTML = ''
  container.setAttribute('class', 'container')
  document.body.appendChild(container)
  for (let i = 0; i < data.amount; i++) {
    let div = document.createElement('div')
    div.setAttribute('class', 'tile')
    div.innerText = data.rooms[i].id
    container.appendChild(div)
  }
  console.log('getMyRoom()', getMyRoom())
}

function joinRoom(roomNumber) {
  socket.emit('joinRoom', roomNumber)
}

function leaveRoom(roomNumber) {
  socket.emit('leaveRoom', roomNumber)
  document.getElementById('room').textContent = ''
}

function getMyRoom() {
  let match = gameData.rooms.filter(
    room => room.data && room.data.sockets[myId]
  )
  return match[0] ? match[0].id : null
}

function getMyId() {
  return myId
}

function autoJoin() {
  if (getMyRoom()) {
    console.warn('Denied. You are already in room ', getMyRoom())
  } else {
    socket.emit('autoJoin')
  }
}
