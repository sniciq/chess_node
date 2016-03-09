var confirmDialogs = angular.module('confirmDialogs',['ui.bootstrap']);
var normalConfirmCtrl = confirmDialogs.controller('normalConfirmCtrl', function($scope, $http, $uibModalInstance, data){
	$scope.info = data;
	
	$scope.ok = function() {
		$uibModalInstance.close('ok');
	};
	
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	}
});
confirmDialogs.provider('confirmDialogs', function(){
	this.$get = ['$uibModal',function ($uibModal){
		return {
			error : function(title, info){
				return $uibModal.open({
					template : '<div class="modal-header">'+
					'				<div class="row">'+
					'					<div class="col-sm-7">'+
					'						<h4 class="modal-title">{{info.title}}</h4>'+
					'					</div>'+
					'					<div class="col-sm-5">'+
					'						<button type="button" class="close" ng-click="cancel()"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
					'					</div>'+
					'				</div>'+
					'			</div>'+
					'			<div class="modal-body">'+
					'				<div class="row well" style="color:red;word-break:break-all;">'+
					'					{{info.info}}'+
					'				</div>'+
					'			</div>',
					controller : 'normalConfirmCtrl',
					size: 'sm',
					resolve : {
						data : function(){
							return {
								title : title,
								info : info
							};
						}
					}
				});
			},
			normal : function(title, info){
				return $uibModal.open({
					template : '<div class="modal-header">'+
					'				<div class="row">'+
					'					<div class="col-sm-7">'+
					'						<h4 class="modal-title">{{info.title}}</h4>'+
					'					</div>'+
					'					<div class="col-sm-5">'+
					'						<button type="button" class="close" ng-click="cancel()"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
					'					</div>'+
					'				</div>'+
					'			</div>'+
					'			<div class="modal-body">'+
					'				<div class="row well" style="word-break:break-all;">'+
					'					{{info.info}}'+
					'				</div>'+
					'				<div class="row">'+
					'					<div class="col-sm-offset-2 col-sm-4">'+
					'						<button type="submit" class="btn btn-danger" ng-click="ok()">确认</button>'+
					'					</div>'+
					'					<div class="col-sm-4">'+
					'						<button type="button" class="btn btn-default" ng-click="cancel()">取消</button>'+
					'					</div>'+
					'				</div>'+
					'			</div>',
					controller : 'normalConfirmCtrl',
					size: 'sm',
					resolve : {
						data : function(){
							return {
								title : title,
								info : info
							};
						}
					}
				});
			}
		}
	}];
});
