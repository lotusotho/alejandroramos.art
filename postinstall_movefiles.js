const fs = require('fs');

// File destination.txt will be created or overwritten by default.
fs.copyFile('./models', './dist/assets/', (err) => {
  if (err) throw err;
  console.log('source was copied to destination.txt');
});