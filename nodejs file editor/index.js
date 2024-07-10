const fs = require("fs");
const path = require('path');

let operation = process.argv[2]
let a = process.argv[3];
let b = process.argv[4];


function fileExists(filePath) {
    return fs.existsSync(filePath);
  }

function read(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
}

if(operation==="read"){
    if (!a) {
        console.log('Please provide a file to read.');
      } else if (!fileExists(a)) {
        console.log(`File '${filePath}' does not exist.`);
      } else {
        read(a);
      }
}
