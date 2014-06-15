var controller = angular.module('controllers', ['services'])
        
        .controller('BlogCtrl', function($scope, Posts) {
            $scope.posts = Posts.all();

            $scope.getDate = function(id) {
                var post = Posts.get(id);
                var date = new Date(post.date);
                return date.toLocaleDateString() + ' - ' + date.toLocaleTimeString();
            };
        });