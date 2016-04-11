(function(){

    angular
        .module('loftschool.contact', [])
        .config(configContact)
        .controller('ContactCtrl', ContactCtrl);

    function configContact($routeProvider) {
        $routeProvider
            .when('/contact', {
                controller: 'ContactCtrl',
                templateUrl: '/app/contact/contact.html'
            })
    }

    function ContactCtrl($scope) {
        $scope.title = 'Contact Controller'
    }
})();