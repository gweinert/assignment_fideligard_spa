app.controller('DatePickerController',
	['$scope', 'DateService',
	function($scope, DateService) {
	
		$scope.dates = DateService.getDates().reverse();
		$scope.dateObject = DateService.getIndexObject();
		$scope.datePicker = 0;
	
		$scope.onDatePickerChange = function() {
			DateService.setActiveDateIndex($scope.datePicker);
		}

		$scope.$watch('dateObject.index', function(newVal) {
			$scope.datePicker = newVal;
		});

	}]
);
