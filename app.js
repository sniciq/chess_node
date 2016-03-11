var express = require('express');
var app = express();
var server = require('http').Server(app);
var socketIO = require('socket.io')(server);

var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var ChatCtrl = require('./app/controller/ChatCtrl.js');

app.use(session({secret: '123456',cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));
app.use(express.compress());	
app.use(express.static(__dirname + '/public'));	

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var roomUsers = {};

ChatCtrl(app, socketIO, roomUsers);

function addChatUser(chatUser) {
	if(!roomUsers[chatUser.room]) {
		roomUsers[chatUser.room] = {};
	}

	//如果存在，则加个随机名，后续可优化
	if(roomUsers[chatUser.room][chatUser.userName]) {
		chatUser.userName = chatUser.userName + '_' + new Date().getTime();
	}

	roomUsers[chatUser.room][chatUser.userName] = {'userName': chatUser.userName};
	console.log('add');
	console.log(roomUsers);
} 

function delChatUser(roomName, userName) {
	if(roomUsers[roomName]) {
		delete roomUsers[roomName][userName];
	}	
}

socketIO.of('/chartchannel').on('connection', function(socket){	
	
	socket.on('disconnect', function () {	
		delChatUser(socket.roomName, socket.userName);	
		socket.broadcast.to(socket.roomName).emit('userLeft', { me:false,userName:socket.userName});
	});

	socket.on('join', function (data) {	
		addChatUser(data);
		socket.join(data.room);
		socket.userName = data.userName;
		socket.roomName = data.room;
		socket.broadcast.to(socket.roomName).emit('userJoinIn', { me:false,userName:data.userName, i: 'hi all.'});
		socket.emit('userJoinIn', { me:true,userName:socket.userName, i: socket.userName + ' 加入了聊天.' });
	});

	socket.on('clientInfo', function (data) {		
		socket.emit('news', { me:true,userName:data.userName,  i:data.clientInfo });
		socket.broadcast.to(socket.roomName).emit('news', { me:false, userName:data.userName,i: data.clientInfo });
	});
});

var port = 8080;
server.listen(port);
console.log('app listening on port ' + port);
