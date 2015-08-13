/*
  sudo bunyan -p '*'
*/

var r = require('bunyan');

var l = new r({ 'name': 'test', 'level': 'info'});

setInterval(function () {
  l.info('test info message');
  l.debug('something went wrong');
}, 1000);
