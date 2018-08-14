/*
* Copyright © 2018 Redis Labs, Inc.
* This program should be used for demo puposes only. The software
* is provided “as is”, without warranty of any kind.
*
* Usage: node server.js <HTTP port> <Redis port>
* Example: node server.js 3000 6379
*/


var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require('redis');

var httpPort = process.argv[2] || 3000;
var redisPort = process.argv[3] || 6379;
process.env.location = process.argv[4] || "";

// Redis client to query and publish to a channel
var redisClient = redis.createClient({
  port : redisPort,
  host : 'localhost'
});

// Redis client to listen to a channel
var redisSub = redis.createClient({
  port : redisPort,
  host : 'localhost'
});

// Init modules to process get and post parameters
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser());

var session = require('express-session');
// All static files are under $HOME/public
app.use(express.static('public'))
app.set('view engine','ejs');
require('./app/routes.js')(app, redisClient);

// Initialize socket.io for asynchronous communication between the Server
// and the web application
io.on('connection', function(socket){
});

// Listen to pub/sub messages on a Redis channel
msglistener = require('./app/msglistener.js');
msglistener.listen(redisSub, redisClient, io);

// Start the HTTP server
http.listen(httpPort, function(){
  console.log('HTTP listening on :'+httpPort);
});
