module.exports = function(app, socketIO) {
	app.get('/chat', function(req, res) {
		res.sendfile('./public/views/chat.html');
		// if(req.session.SessionUser) {
		// 	res.sendfile('./public/views/app.html');
		// }
		// else {
		// 	res.sendfile('./public/views/index.html');
		// }	
	});

	// app.get('/all', function(req, res) {
	// 	socketIO.to('room1').emit('news', { i: 'hi all' });
	// 	res.end();
	// });
}