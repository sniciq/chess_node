var JsonResult = require('../util/JsonResult.js');

module.exports = function(app, socketIO, roomUsers) {
	app.get('/chat', function(req, res) {
		res.sendfile('./public/views/chat.html');
	});

	app.post('/chatUsers', function(req, res) {
		console.log(req.body);
		console.log(req.body.room);
		console.log(roomUsers);
		res.json(roomUsers[req.body.room]); 
		//res.json(roomUsers); 
	});
}