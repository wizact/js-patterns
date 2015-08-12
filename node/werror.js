var verror = require('verror');

var err1 = new Error('error no 1');
var err2 = new verror.VError(err1, 'error no 2');
var err3 = new verror.WError(err2, 'error no 3');

console.log(err3.message);
