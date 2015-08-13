var fs = require('fs');
var zlib = require('zlib');

var r = fs.createReadStream('streams1.js');
var z = zlib.createGzip();
var w = fs.createWriteStream('environment.js.gz');

r.pipe(z).pipe(w);
