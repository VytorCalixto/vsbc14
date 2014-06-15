var services = angular.module('services', ['firebase'])

        .factory('Posts', function($firebase) {
            var posts = $firebase(new Firebase('https://vsbcblog.firebaseio.com/posts'));

            return{
                all: function() {
                    return posts;
                },
                get: function(key) {
                    return posts[key];
                },
                push: function(post) {
                    posts.$add(post);
                }
            };
        });