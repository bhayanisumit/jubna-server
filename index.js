 
  
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
//   res.setHeader('Access-Control-Allow-Methods', 'POST');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });
 
const express = require('express');
const fs = require('fs');
const https = require('https');
const privateKey = fs.readFileSync('/etc/letsencrypt/live/invitee.ca/privkey.pem','utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/invitee.ca/cert.pem','utf8');
const credentials = {
        key: privateKey,
        cert: certificate
};

const app =express();
const httpsServer = https.createServer(credentials, app);
var io = require('socket.io')(httpsServer);


// var app = require('express')();
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});


io.on('connection', function(socket){
  socket.on('displayadd', function(msg){
    io.emit('displayadd', msg);
  });

  socket.on('result', function(msg) {
    io.emit('result', msg);
  });
});

httpsServer.listen(3030, function() {
  console.log('listening on *:3030');
});