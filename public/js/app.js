

var app = angular.module('app',['ngRoute', 'ui.bootstrap','angularMoment', 'toaster','ui.checkbox'], function($interpolateProvider){
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});



app.run(['$rootScope', '$location', '$window', '$http','$modal','amMoment', function($rootScope, $location, $window, $http, $modal, amMoment){

    $rootScope.go = function(path){
        if(path === 'back')
        {
            $window.history.back();
        }
        else{
            $location.path(path);
        }
    };


    /*socket.on('userStatusUpdate', function(data){
        angular.forEach($rootScope.usersList, function(item){
            if(item.id == data.id)
            {
                item.isOnline = data.isOnline;
                item.lastLoginDate = data.lastLoginDate;
            }
        });
    });*/

}]);

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/index', {
            templateUrl: 'Index.html',
            controller: 'userDashBoardController'
        })
        .when('/ngos', {
            templateUrl: 'site/pages/ngos.html',
            controller: 'ngosController'
        })
        .when('/ngo/:id', {
            templateUrl: 'site/pages/ngo.html',
            controller: 'ngoController'
        })
        .when('/causes',{
            templateUrl:'site/pages/causes.html',
            controller: 'causesController'
        })
        .when('/admin',{
            templateUrl:'site/pages/admin.html',
            controller: 'adminPageController'
        })
        .otherwise({
            templateUrl: 'Index.html',
            controller: 'userDashBoardController'
        });
}]);

app.directive('validNumber', function() {
    return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
            if(!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function(val) {
                var clean = val.replace( /[^0-9]+/g, '');
                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function(event) {
                if(event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
});

/*app.factory('socket', function($rootScope){
    var socket = io.connect();
    return{
        on: function(eventName, callback) {
            socket.on(eventName, function(){
                var args = arguments;
                $rootScope.$apply(function(){
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback){
            socket.emit(eventName, data, function(){
                var args = arguments;
                $rootScope.$apply(function(){
                    if(callback){
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
});*/

app.controller('navBarController', function($scope, $rootScope, $modal, $http){

});

app.controller('newTripCtrl', function($scope, $http){

    $scope.carCategories = ['Econômico','Compacto','Sedan','SUV'];

    $scope.trip = {
       user: '',
       flight:{
           has: true,
           class:'eco',
           origin:'',
           destiny:''
       },
       hotel:{
           has: true,
           stars:{
               min:1,
               max:1
           }
       },
       car:{
           has: true,
           category:''
       },
       dates:{
           start: new Date,
           end: new Date,
           type: 'exact'
       },
       people:{
           n: 2,
           fbIds: []
       }
   };

    console.log($scope.trip)
});