var VError = require('verror');

var fileName = 'notexist.txt';
var err = new VError('File Not Exist');
console.log(err);
console.log(err.stack);
