var vsbc = angular.module('vsbc14', ['ui.router']);

vsbc.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home',{
      url: '/home',
      templateUrl: 'templates/home.html'
    })
    .state('trabalhos',{
      url: '/trabalhos',
      templateUrl: 'templates/trabalhos.html'
    })
    .state('projetos',{
      url: '/projetos',
      templateUrl: 'templates/projetos.html',
      controller: 'SiteCtrl'
    })
    .state('contato',{
      url: '/contato',
      templateUrl: 'templates/contato.html'
    });

  $urlRouterProvider.otherwise('/home');
});

vsbc.controller('SiteCtrl',function($scope, $http){
  $scope.projetos = [];

  $http.get('https://api.github.com/users/vytorcalixto/repos')
            .success(function(data, status, headers, config) {
                $scope.projetos = data;
            });
});
