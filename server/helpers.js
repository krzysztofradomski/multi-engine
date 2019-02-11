const getNumberFromRoomId = str => Number(str.match(/\d+/)[0])

const sortAscending = (a, b) => a - b

const findLowestNumberNotInArray = arr => {
  const set = new Set(arr)
  let i = 1
  while (set.has(i)) {
    i++
  }
  return i
}

module.exports = {
  getNumberFromRoomId,
  sortAscending,
  findLowestNumberNotInArray
}
