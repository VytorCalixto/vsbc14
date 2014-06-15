var vsbc = angular.module('vsbc14', ['ui.bootstrap', 'ui.router', 'ngAnimate']);

vsbc.run(
        ['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {

                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]);

vsbc.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
            .state('site', {
                url: '/site',
                templateUrl: 'templates/siteTemplate.html',
                abstract: true
            })
            .state('site.home', {
                title: 'Vytor Calixto - Home',
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'AppCtrl'
            })
            .state('site.sobre', {
                title: 'Vytor Calixto - Sobre',
                url: '/sobre',
                templateUrl: 'templates/sobre.html',
                controller: 'AppCtrl'
            })
            .state('site.projetos', {
                title: 'Vytor Calixto - Projetos',
                url: '/projetos',
                templateUrl: 'templates/projetos.html',
                controller: 'AppCtrl'
            })
            .state('site.contato', {
                title: 'Vytor Calixto - Contato',
                url: '/contato',
                templateUrl: 'templates/contato.html'
            });

    $urlRouterProvider.otherwise('/site/home');
});

vsbc.controller('AppCtrl', function($scope, $http) {
    $scope.profileSrc = 'http://graph.facebook.com/vytorcalixto/picture?height=111&width=111';
    $scope.projetos = [];

    $http.get('https://api.github.com/users/vytorcalixto/repos')
            .success(function(data, status, headers, config) {
                $scope.projetos = data;
            });

    $scope.getAge = function() {
        var today = new Date();
        var birthDate = new Date('1996-06-16T08:00:00.000z');
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };
});