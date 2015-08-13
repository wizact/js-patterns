var VError = require('verror');
var fs = require('fs');

var filename = 'notexists.txt';

fs.stat(filename, function (err1, stat) {
    if (err1) {
      var err2 = new VError(err1, 'stat "%s" failed', filename);
      console.error(err2.message);
      console.error(err2.cause().message);
    } else {
      console.log(stat);
    }
});
