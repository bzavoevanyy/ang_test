(function () {

    angular
        .module('loftschool.about', [])
        .config(configAbout)
        .controller('AboutCtrl', AboutCtrl);

    function configAbout($routeProvider) {
        $routeProvider
            .when('/about', {
                controller: 'AboutCtrl',
                templateUrl: '/app/about/about.html'
            })
    }

    function AboutCtrl($scope) {
        $scope.title = 'About Controller'
    }

})();