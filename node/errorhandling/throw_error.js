/*
  Synchronous call with operational error will deliver by throwing the Error
  object. Caller handles that using try/catch block
*/

var fs = require('fs');


var readFile = function() {
  return fs.readFileSync('notExistFile.txt');
};

try {
  var data = readFile();
  console.log(data);
} catch (e) {
  console.log(e);
}
