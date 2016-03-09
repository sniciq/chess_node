var myApp = angular.module('myApp', 
	['ngRoute', 'ngSanitize','ngAnimate','ngMessages','cgBusy', 'toaster']
);



myApp.controller('MainCtrl', function($rootScope,$scope, $http, $location, toaster) {
	$scope.msgs = [];
	myApp.socket = io('http://localhost:8080/chart');
	myApp.socket.on('news', function (data) {	    
	    $scope.msgs.push(data.i);	    
	    $scope.$apply();
	    myApp.socket.emit('my other event', { my: 'data' });
	});

	$scope.send = function() {
		myApp.socket.emit('clientInfo', $scope.msg);
		$scope.msg.clientInfo = '';
	}
});
