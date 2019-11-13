// var http = require('http').createServer(app);
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



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('pos', function(msg){
      io.emit('pos', msg);
    });
  });

  httpsServer.listen(3000, function(){
  console.log('listening on *:3000');
});