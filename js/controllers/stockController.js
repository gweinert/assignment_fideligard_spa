app.controller('StockController',
	['$scope', 'stocks', 'DateService', 'StockService',
	function($scope, stocks, DateService, StockService) {

		$scope.stockSortVal = '';
		$scope.isReverse = true;
		
		$scope.stocks = stocks;

		$scope.sortStocksBy = function(field) {
			$scope.stockSortVal = field;
			$scope.isReverse = !$scope.isReverse;
		}
		
		$scope.$watch(function() {
				return DateService.getActiveDate();
			}, function(newDate) {
			$scope.stocks = StockService.getStocks(newDate);
		});
	}]
);
