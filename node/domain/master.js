var cluster = require('cluster');
var os = require('os');
var path = require('path');

if (cluster.isMaster) {
  var numOfCores = os.cpus().length;

  for (var i = 0; i < numOfCores; i++) {
    cluster.setupMaster({
        exec: path.join(__dirname, '/worker.js'),
        args: ['--environment', 'dev'],
        silent: false
    });

    cluster.fork();
  }

  cluster.on('online', function(worker) {
    console.log('worker %s is online', worker.id);
  });

  cluster.on('fork', function(worker){
    console.log("forking worker #%s", worker.id)
  });

  cluster.on('disconnect', function(worker){
    console.log('disconnect!');
    cluster.fork();
  });

}
