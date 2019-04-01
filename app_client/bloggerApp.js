//*** REST Web API functions *** 
function getAllBlogs($http){
    return $http.get('/api/blogs');
}
function addBlog($http, data) {
    return $http.post('/api/blogs', data);
}
function getBlogByID($http, blogid){
    return $http.get('/api/blogs/'+ blogid);
}
function updateBlog($http, blogid, data) {
    return $http.put('/api/blogs/'+ blogid, data);
}
function deleteBlog($http, blogid){
    return $http.delete('/api/blogs/'+ blogid);
}

var app = angular.module('blogApp', ['ngRoute']); 

//*** Router Provider *** 
app.config(function($routeProvider) {
  $routeProvider
	.when('/', {
	    templateUrl: 'home.html',
	    controller: 'homeController',
	    controllerAs: 'vm'
	})
	.when('/list', {
	    templateUrl: 'list.html',
	    controller : 'listController',
            controllerAs: 'vm'
	})
	.when('/add', {
	    templateUrl: 'add.html',
	    controller: 'addController',
            controllerAs: 'vm'
	})
        .when('/edit/:blogid', {
	    templateUrl: 'edit.html',
	    controller: 'editController',
            controllerAs: 'vm'
	})
	.when('/remove/:blogid', {
	    templateUrl: 'remove.html',
	    controller: 'removeController',
	    controllerAs: 'vm'
	})
	.otherwise({redirectTo: '/'});
});
//*** Controllers *** 
app.controller('homeController', function homeController() {
    var vm = this;
    vm.homeHeader = "Eric Frey's Blog Site";
    vm.homeText = "Welcome to my blog site";
});
app.controller('listController', function listController($http) {
    var vm = this;
    vm.listHeader = "Blog List";
    getAllBlogs($http)
	.success(function(data) {
	    vm.blogs = data;
	})
});
app.controller('editController', function editController($scope, $http, $routeParams){
    var vm = this;
    var id = $routeParams.blogid;
    
    getBlogByID($http, id)
	.success(function(data) {
            console.log("success");
            vm.blog = data;
	})
    vm.submit = function() {
        var data = vm.blog;
        data.blogtitle = userForm.blogtitle.value;
        data.blogtext = userForm.blogtext.value;
        updateBlog($http, id, data)
            .success(function(data) {
                console.log("UPDATED");
            })
    }
});
app.controller('removeController', function removeController($scope, $http, $routeParams){
    var vm = this;
    var id = $routeParams.blogid;
    getBlogByID($http, id)
        .success(function(data) {
	    console.log("success");
            vm.blog = data;
	})
    vm.submit = function() {
	deleteBlog($http, id)
            .success(function(data) {
		console.log("DELETED");
            })
    }
});
app.controller('addController', function addController($http) {
    var vm = this;
    console.log(vm.blog);
    vm.blog = {};
    vm.submit = function(){
	var data = vm.blog;
	data.blogtitle = userForm.blogtitle.value;
	data.blogtext = userForm.blogtext.value;
	addBlog($http, data)
	    .success(function(data) {
		console.log("ADDED");
	    })
    }
});
