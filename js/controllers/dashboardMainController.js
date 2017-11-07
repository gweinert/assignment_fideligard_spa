app.controller('DashboardMainController',
	['$scope', '$state', 'TradeService',
	function($scope, $state, TradeService) {
		
		var lastStock = TradeService.getLastStock();
		var params = {};
		
		$scope.nav = $state.$current.name;
		
		$scope.onSelectChange = function() {
			if ($scope.nav === 'dashboard.trade') {
				params.ticker = lastStock.ticker;
			}
			$state.go($scope.nav, params);
		}
	
	}]
);
