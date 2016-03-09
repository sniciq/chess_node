module.exports = function(app) {
	app.get('/', function(req, res) {
		res.sendfile('./public/views/app.html');
		// if(req.session.SessionUser) {
		// 	res.sendfile('./public/views/app.html');
		// }
		// else {
		// 	res.sendfile('./public/views/index.html');
		// }	
	});
}