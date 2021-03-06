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
var _users = [
    {
        "_id": "570aa086749e98dd2c9fdd2c",
        "age": 39,
        "eyeColor": "green",
        "name": "Aisha Estes",
        "gender": "female"
    },
    {
        "_id": "570aa086ee1f8bd71af6442c",
        "age": 37,
        "eyeColor": "brown",
        "name": "Kline Richmond",
        "gender": "male"
    },
    {
        "_id": "570aa0869a267f73ac75d6c7",
        "age": 37,
        "eyeColor": "blue",
        "name": "Mattie Hicks",
        "gender": "female"
    },
    {
        "_id": "570aa08643208967d70f71ff",
        "age": 20,
        "eyeColor": "green",
        "name": "Blanchard Benton",
        "gender": "male"
    },
    {
        "_id": "570aa086ec0618bd65ce83b3",
        "age": 28,
        "eyeColor": "blue",
        "name": "Karen Bowers",
        "gender": "female"
    },
    {
        "_id": "570aa086ac4eaf8cf971bae5",
        "age": 38,
        "eyeColor": "green",
        "name": "Diann Salas",
        "gender": "female"
    }
];
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
(function ()
{
    'use strict';
    angular
        .module('loftschool.home.user', [])
        .config(configHomeUser)
        .controller('UserCtrl', userCtrl);
    function configHomeUser($routeProvider) {
        $routeProvider
            .when('/home/:id', {
                controller: 'UserCtrl',
                templateUrl: '/app/home/home.user.html'
            })
    }
    function userCtrl($scope, $filter, $routeParams) {
        var newUser = $filter('filter')(_users, {'_id': $routeParams.id});
        $scope.user = newUser[0];
        console.log(newUser);
    }

})();
(function () {
    angular
        .module('vkapi', [])
        .factory('Friends', friends);
    function friends() {
        var service = {
            getFriends: getFriends
        };

        function getFriends() {
            var ret = [];
            new Promise(function (resolve, reject) {
                VK.init({
                    apiId: 5384650
                });
                VK.Auth.login(function (response) {
                    if (response.session) {
                        resolve(response)
                    } else {
                        reject(new Error('Не удалось авторизироваться!'));
                    }
                }, 2)
            }).then(function (response) {
                return new Promise(function (resolve, reject) {

                    var param = {
                        user_id: response.session.mid,
                        fields: ["nickname", "photo_50"]
                    };
                    VK.api('friends.get', param, function (response) {
                        if (response.response) {
                            resolve(response.response)
                        } else {
                            reject(new Error('Не удалось получить список друзей!'))
                        }
                    })

                });
            }).catch(function (e) {
                alert('Ошибка ' + e.message);
            }).then(function(response) {
                //console.log(response);
                ret = response;
            });
            console.log(ret);
            return ret;
        }
        return service;
    }
})();