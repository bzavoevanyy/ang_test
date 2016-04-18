(function () {
    'use strict';

    angular
        .module('loftschool', ['ngRoute', 'loftschool.about', 'loftschool.contact','loftschool.home.user', 'vkapi'])
        .config(configLoftschool)
        .run(runLoftschool)
        .controller('HomeCtrl', homeCtrl);

    function configLoftschool($routeProvider) {
        $routeProvider
            .when('/home', {
                controller: 'HomeCtrl',
                templateUrl: '/app/home/home.html'
            })
            .otherwise({redirectTo: '/home'})
    }

    function runLoftschool() {
        var vm = this;
        console.log('run');
    }

    function homeCtrl($scope, Friends) {
        $scope.users = Friends.getFriends();
    }
})();