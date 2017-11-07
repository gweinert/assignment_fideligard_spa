app.controller('PortfolioController',
	['$scope', 'TransactionService', 'StockService', 'DateService',
	function($scope, TransactionService, StockService, DateService,) {
		
		$scope.transactions = TransactionService.getTransactions();
		
		$scope.stocks = {};
		var currentDate = DateService.getActiveDate();
		StockService.getStocks(currentDate).forEach(function(stock) {
			$scope.stocks[stock.ticker] = stock;
		});

		$scope.$watch(function() {
			return DateService.getActiveDate();
		}, function(newVal) {
				StockService.getStocks(newVal).forEach(function(stock) {
					$scope.stocks[stock.ticker] = stock;
				});
			}
		)
		
		console.log('$scope port', $scope);
	}]
);
