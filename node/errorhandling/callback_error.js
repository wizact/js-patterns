/*
  Asynchronous call with operational error will deliver the error using
  call back. Caller evaluates the err and handles the error if any
*/

var fs = require('fs');


var readFile = function(callback) {
  fs.readFile('notExistFile.txt', callback);
};

readFile(function(err, data) {
  if (err) throw err;
  console.log(data)
});
