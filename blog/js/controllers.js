var controller = angular.module('controllers', [])

        .controller('BlogCtrl', function($scope, $http, $stateParams) {
            $http.get('posts/posts.json').success(function(data) {
                if('postId' in $stateParams){
                    for(var i in data){
                        if(data[i].id==$stateParams.postId){
                            $scope.posts=[data[i]];
                        }
                    }
                }else{
                    $scope.posts=data;
                }
            });
            $scope.view = false;

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