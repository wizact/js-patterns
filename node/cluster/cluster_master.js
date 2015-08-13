var cluster = require('cluster');
var http = require('http');
var os = require('os');
var url = require('url');

var numCPUs = os.cpus().length;

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('fork', function(worker){
    console.log("forking worker #%s", worker.id)
  });

  cluster.on('listening', function(worker, address) {
    console.log('Worker #%s is listening to http://%s:%s...', worker.id, address.address, address.port);
  });

  cluster.on('exit', function(worker, code, signal){
    console.log('worker ' + worker.process.pid + ' died %s, restarting...', signal | code);
    cluster.fork();
  });

  cluster.on('disconnect', function(worker) {
    console.log('The worker #' + worker.id + ' has disconnected');
  });

  cluster.on('online', function(worker) {
    console.log('worker %s is online', worker.id);
  });
} else {
  http.createServer(function(req, res){
    res.writeHead(200);
    res.end("hello world!");
    var queryData = url.parse(req.url, true).query;
    if (queryData && queryData.id == 1)
    {
      throw new Error('going down');
    }
  }).listen(8000);
}
