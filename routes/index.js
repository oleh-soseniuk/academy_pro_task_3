var express = require('express');
var router = express.Router();
const child_process = require('child_process');


module.exports = function(app) {
  router.get('/', function(req, res, next) {
    res.render('index', { title: '100th Fibonacci Number' });
  });

  router.get('/math', function(req, res, next) {
      res.writeHead(200);
      var child = child_process.fork( './fibonacci.js');
      child.on('message', (data) => {
        if (data.type === 'partial') {
           app.io.emit('update', data);
        } else if (data.type === 'result') {
           res.end(JSON.stringify(data));
        }
      })
  });

  return router;
};
