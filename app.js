var express = require('express');
var app = express();
var server = require('http').Server(app);
var socketIO = require('socket.io')(server);

var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var AppCtrl = require('./app/controller/AppCtrl.js');

app.use(session({secret: '123456',cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));
app.use(express.compress());	
app.use(express.static(__dirname + '/public'));	

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

AppCtrl(app);

socketIO.of('/chart').on('connection', function (socket) {
  socket.emit('news', { i: 'hello' });
  socket.on('clientInfo', function (data) {    
  	//socket.emit('news', { i: 'you have send: ' + data.clientInfo });
  	socket.broadcast.emit('news', { i: 'you have send: ' + data.clientInfo });  	
  });
});

var port = 8080;
server.listen(port);
console.log('app listening on port ' + port);
