var vsbc = angular.module('vsbc14', []);

vsbc.controller('SiteCtrl',function($scope, $http){
    $scope.projetos = [];

    $http.get('https://api.github.com/users/vytorcalixto/repos')
    .success(function (data, status, headers, config) {
        $scope.projetos = data;
    });

    $http.get('js/trabalhos.json')
    .success(function (data, status, headers, config) {
        $scope.trabalhos = data;
    });

    $scope.getAge = function(){
    	var birthDate = new Date('1996-06-16T00:00:00.000Z');
        var otherDate = new Date();

        var years = (otherDate.getFullYear() - birthDate.getFullYear());

        if (otherDate.getMonth() < birthDate.getMonth() ||
                otherDate.getMonth() === birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
            years--;
        }

        return years;
    }
});
