var blog = angular.module('blog', ['ui.bootstrap', 'ui.router', 'ngAnimate',
    'controllers', 'ngSanitize'], function($httpProvider) {
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
});

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
                title: 'Home',
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'BlogCtrl'
            })
            .state('new-post', {
                title: 'Novo Post',
                url: '/new-post',
                templateUrl: 'templates/new-post.html',
                controller: 'BlogCtrl'
            });

    $urlRouterProvider.otherwise('/home');
});