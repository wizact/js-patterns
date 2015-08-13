var async = require("vasync");
var util = require('util');


async.parallel({
  'funcs': [
    function f1 (callback) { callback(null, "1"); },
    function f2 (callback) { callback(null, "2"); },
    function f3 (callback) { callback(null, "3"); }
  ]
}, function (err, results) {
  console.log("error: %s", err);
  console.log(util.inspect(results, { depth: null }));
});
