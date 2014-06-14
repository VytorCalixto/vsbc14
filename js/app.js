var vsbc = angular.module('vsbc14', ['ui.bootstrap', 'ui.router', 'ngAnimate']);

vsbc.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'AppCtrl'
            })
            .state('sobre', {
                url: '/sobre',
                templateUrl: 'templates/sobre.html'
            })
            .state('projetos', {
                url: '/projetos',
                templateUrl: 'templates/projetos.html',
                controller: 'AppCtrl'
            })
            .state('contato', {
                url: '/contato',
                templateUrl: 'templates/contato.html'
            });

    $urlRouterProvider.otherwise('/home');
});

vsbc.controller('AppCtrl', function($scope, $http) {
    $scope.profileSrc = 'http://graph.facebook.com/vytorcalixto/picture?height=111&width=111';
    $scope.projetos = [];

    $http.get('https://api.github.com/users/vytorcalixto/repos')
            .success(function(data, status, headers, config) {
                $scope.projetos = data;
            });
});