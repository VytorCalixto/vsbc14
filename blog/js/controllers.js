var controller = angular.module('controllers', [])

        .controller('BlogCtrl', function($scope, $http, $stateParams) {

            $http.get('posts/posts.json').success(function(data) {
                if ('postId' in $stateParams) {
                    for (var i in data) {
                        if (data[i].id == $stateParams.postId) {
                            $scope.posts = [data[i]];
                        }
                    }
                } else {
                    $scope.posts = data;
                }
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
        })
        .controller('EditorCtrl', function($scope) {
            $scope.view = false;
            $scope.editorConfig = {
                lineNumbers: true,
                theme: 'monokai',
                mode: 'text/html',
                matchBrackets: true,
                matchTags: true,
                autoCloseBrackets: true,
                autoCloseTags: true,
                placeholder: 'Conteúdo do post',
                lineWrapping: true
            };
            
            $scope.toggleView = function(){
                $scope.view = !$scope.view;
            }
        });