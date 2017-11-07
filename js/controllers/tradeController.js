app.controller('TradeController',
	['$scope', '$stateParams', 'stock', 'StockService', 'DateService', 'TradeService',
	function($scope, $stateParams, stock, StockService, DateService, TradeService) {

		$scope.stock = stock;	
		$scope.formData = {
			ticker: stock.ticker,
			tradeOption: 'Buy',
			quantity: 1,
			date: new Date(DateService.getActiveDate()),
		};
		
		TradeService.setLastStock($scope.stock.ticker);
		$scope.balance = TradeService.getBalance();

		// need
		$scope.onDateChange = function() {
			DateService.setActiveDate($scope.formData.date);
		}

		$scope.$watch(function() {
				return DateService.getActiveDate();
			}, function(newDate) {
			$scope.formData.date = new Date(newDate);				
			$scope.stock = StockService.getStock($stateParams.ticker, newDate);
		});

		// need
		// put into tradeService?
		var ownedStocks = TradeService.getOwnedStocks();		
		$scope.isValid = function() {
			var isBuying = $scope.formData.tradeOption === 'Buy';
			var isSelling = $scope.formData.tradeOption === 'Sell';
			var enoughMoney = $scope.balance >= $scope.stock.data.Close * $scope.formData.quantity;
			var validDate = $scope.formData.date >= new Date(DateService.getDates()[0]); 
			var ownsThatStock = ownedStocks[$scope.stock.ticker] && (ownedStocks[$scope.stock.ticker].totalOwned >= $scope.formData.quantity);

			if (isBuying && (enoughMoney && validDate)) {
				return true;
			} else if (isSelling && ownsThatStock) {
				return true;
			} else return false;
		}

		// need
		$scope.submit = function() {
			if ($scope.formData.tradeOption === 'Buy') {
				TradeService.buyStock($scope.stock, $scope.formData);
			} else if ($scope.formData.tradeOption === 'Sell') {
				TradeService.sellStock($scope.stock, $scope.formData);				
			}
		}
		
	}]
);
