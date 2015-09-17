angular.module('registerModules', [])
.controller('registerController', function($scope,$http) {
	
	$scope.submit_data = function () {
        $scope.message = "";
        		
            var request = $http({
                method: "post",
                url: "../model/submit_register.php",
                data: {
                    first_name: $scope.first_name,
					last_name: $scope.last_name,
					tel: $scope.tel,
					TruckNo: $scope.TruckNo,
                    TruckPV: $scope.TruckPV
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            request.success(function (data) {
                $scope.message = data;
            });
		}
});