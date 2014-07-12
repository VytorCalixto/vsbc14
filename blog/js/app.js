var blog = angular.module('blog', ['ui.bootstrap', 'ui.router', 'ngAnimate',
    'controllers', 'ngSanitize', 'ui.codemirror']);

blog.run(
        ['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {

                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]);

blog.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
            .state('home', {
                title: 'Home - ',
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'BlogCtrl'
            })
            .state('new-post', {
                title: 'Novo Post - ',
                url: '/new-post',
                templateUrl: 'templates/new-post.html',
                controller: 'BlogCtrl'
            })
            .state('post-detail', {
                url: '/post/:postId',
                title: ' ',
                templateUrl: 'templates/home.html',
                controller: 'BlogCtrl'
            });

    $urlRouterProvider.otherwise('/home');
});