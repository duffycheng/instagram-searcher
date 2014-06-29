var photoApp = angular.module("photoApp",['ngAnimate']);
photoApp.controller("searchController",function($scope,$rootScope,$http){
	//init
	$scope.isFormShow = true;
	$scope.isDataReceived = false;
	$scope.failed = false;
	
    var params = {
        client_id: 'bbc2a385f2ed44a2826204d8d37edb82',
        callback: "JSON_CALLBACK"
    };

    // requestPics("cat");



	$scope.submit=function(){
		$scope.submitted = true;
		if ($scope.searchForm.$valid) {
			requestPics($scope.tag);
      }
	};
	$scope.searchAgain = function(){
		resetForm();
		$scope.isFormShow = true;
		$scope.isDataReceived = false;
		$scope.failed = false; //if the fail is present
		$scope.data = {};
	};

	function resetForm(){
		$scope.submitted = false;
		$scope.tag ="";
	}

	function requestPics(tag){
        var url = "https://api.instagram.com/v1/tags/"+tag+"/media/recent";
        $http({
            method: 'JSONP',
            url: url,
            params: params
        })
        .success(displayPics).error(function(data, status, headers, config) {
            console.log(data);
            console.log(status);
            console.log(headers);
            console.log(config);
            $scope.failed = true;
        });
	}

	function displayPics(result){
		$scope.isFormShow = false;
		$scope.data = result.data;
        $scope.searchTag = $scope.tag;
		$scope.isDataReceived = true;
	}

});



