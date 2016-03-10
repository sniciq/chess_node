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

AppCtrl(app, socketIO);

socketIO.of('/chartchannel').on('connection', function(socket){	
	
	socket.on('join', function (data) {
		console.log(data);
		socket.join(data.room);
		socket.userName = data.userName;
		socket.broadcast.to(data.room).emit('news', { me:false,userName:data.userName, i: 'hi all.'});
		socket.emit('news', { me:true,userName:data.userName, i: 'hi all.' });
	});

	socket.on('clientInfo', function (data) {
		console.log(data);
		socket.emit('news', { me:true,userName:data.userName,  i:data.clientInfo });
		socket.broadcast.to(data.room).emit('news', { me:false, userName:data.userName,i: data.clientInfo });
	});
});

var port = 8080;
server.listen(port);
console.log('app listening on port ' + port);
