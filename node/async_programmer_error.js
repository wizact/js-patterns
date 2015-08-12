/*
  Asynchronous call with programming error throw the error and crash
*/

var fs = require('fs');
var assert = require('assert');


var readFile = function(fileName, callback) {
  assert.equal(typeof(fileName), 'string');
  assert.ok(fileName.length > 0);
  fs.readFile(fileName, callback);
};

readFile('', function(err, data) {
  if (err) throw err;
  console.log(data)
});
