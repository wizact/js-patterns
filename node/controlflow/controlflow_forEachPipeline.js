var async = require("vasync");
var util = require('util');
var imgOK = 'http://www.trademe.co.nz/images/3/common/retina-kev.gif';
var imgKO = 'http://www.t1rademe.co.nz/images/3/common/retina-kev.gif';

var cb = function(url, callback) {
  require("request").get(url).on('response', function(response) {
    console.log("Code: %s", response.statusCode);
    callback(null, response)
  }).on('error', function (err) {
    console.log("Error: %s", err.code);
    callback(err, null);
  });
};

async.forEachPipeline({
  'func': cb,
  'inputs': [imgOK, imgKO]
}, function (err, results) {
  console.log("error: %s", err);
  console.log(results.operations[0].status);
  console.log(results.operations[1].status);
});
