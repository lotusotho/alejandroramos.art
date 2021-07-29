var fs = require('fs')

var oldPath = './models'
var newPath = './dist/assets/'

fs.rename(oldPath, newPath, function (err) {
  if (err) throw err
  console.log('Successfully renamed - AKA moved!')
})