var controller = angular.module('controllers', [])

        .controller('BlogCtrl', function($scope, $http) {
            $scope.view = false;
            $http.get('posts/posts.json').success(function(data) {
                $scope.posts = data;
            });

            $scope.parseDate = function(date) {
                var parsedDate = new Date(date);
                return parsedDate.toLocaleDateString() + ' - ' + parsedDate.toLocaleTimeString();
            };

            $scope.makePost = function(post) {
                post.date = new Date().toISOString();
                post.id = post.date;
                $scope.posts.push(post);
//                $http.post('posts/posts.json', $scope.posts).then(function(data) {
//                    console.log('ok');
//                });
                post.content = JSON.stringify(post);
//                post.title = '';
//                post.content = '';
            };
        });