'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller("TodoController", ['$scope', '$http', function(scope, http){

	scope.todo_list = {};
	scope.todo = [];
	scope.api_url = "http://todo_list.nodejitsu.com/todo";

	scope.setFormDataTodo = function(value) {
		scope.formData = {};
		scope.formData.message = value;
		scope.formData.priority = 0;
	}

	http.get(scope.api_url+"/priority_list")
		.success(function(data) {
			scope.todo = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	scope.deleteTodo = function(id) {
		http.delete(scope.api_url+'/' + id)
			.success(function(data) {
				http.get(scope.api_url+"/priority_list")
				.success(function(data) {
					scope.todo = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	scope.priorityUpdate = function(id) {
		var url = scope.api_url+'/update/'+id+'?priority=1'
		http.post(url)
			.success(function(data) {
				http.get(scope.api_url+"/priority_list")
				.success(function(data) {
					scope.todo = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	scope.createTodo = function() {
		var url = scope.api_url+'/create?message='+scope.formData.message+'&priority=0';
		http.post(url)
			.success(function(data){
				scope.formData = {};
				http.get(scope.api_url+"/priority_list")
				.success(function(data) {
					scope.todo = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	};

}]);