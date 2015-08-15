var http = require('http');
var domain = require('domain');
var url = require('url');
var cluster = require('cluster');

var server = http.createServer(function(req, res){

  var d = domain.create();

  d.on('error', function(err){
    console.error('error', err.stack);

    try {
        // timer to serve current requests before killing the process
        var killTimer = setTimeout(function() {
          process.exit(1);
        }, 10000);

        // if no pending request, don't let timer keep the process active
        killTimer.unref();

        // do not accept new requests
        server.close();

        // disconnect the worker
        cluster.worker.disconnect();

        // send the 500
        res.statusCode = 500;
        res.setHeader('content-type', 'text/plain');
        res.end('Oops, there was a problem!\n');

    } catch (e) {
      console.error("Error sending 500!", e.stack);
    }

  });

  d.add(req);
  d.add(res);

  d.run(function() {
    handleRequest(req, res);
  });
}).listen(8000);

function handleRequest(req, res) {
  var queryData = url.parse(req.url, true).query;
  if (queryData && queryData.id == 1)
  {
    throw new Error('going down');
  }

  res.writeHead(200);
  res.end("hello world!");
 };
