var vsbc = angular.module('vsbc14', ['ui.router']);

vsbc.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('home',{
        url: '/home',
        templateUrl: 'templates/home.html'
    })
    .state('trabalhos',{
        url: '/trabalhos',
        templateUrl: 'templates/trabalhos.html',
        controller: 'SiteCtrl'
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
    $scope.trabalhos = [];
    $scope.ghSuccess = false;
    $scope.trabSuccess = false;
    $scope.loadingGh = true;
    $scope.loadingTrab = true;

    $http.get('https://api.github.com/users/vytorcalixto/repos')
    .success(function (data, status, headers, config) {
        $scope.projetos = data;
        if ($scope.projetos.length > 0) {
            $scope.ghSuccess = true;
        }
    })
    .then(function () {
        $scope.loadingGh = false;
    });

    $http.get('js/trabalhos.json')
    .success(function (data, status, headers, config) {
        $scope.trabalhos = data;
        if($scope.trabalhos.length > 0){
            $scope.trabSuccess= true;
        }
    })
    .then(function () {
        $scope.loadingTrab = false;
    });
});
