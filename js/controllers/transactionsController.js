app.controller('TransactionsController',
	['$scope', 'TransactionService',
	function($scope, TransactionService) {
		
		$scope.transactions = TransactionService.getTransactions();
		$scope.transactionField = '';

		$scope.sortBy = function(field) {
			$scope.transactionField = field;
		}
		
	}]
);
