app.factory('TradeService',
	['TransactionService', 
	function(TransactionService) {

		var _balance = 1000;
		var _ownedStocks = {};
		var _lastTradedStock = { ticker: 'GOOG' };
		
		// build owned stocks..
		var _transactions = TransactionService.getTransactions();
		_transactions.forEach(function(transaction) {
			if (_ownedStocks[transaction.ticker]) {
				_ownedStocks[transaction.ticker].totalOwned += transaction.quantity;
			} else {
				_ownedStocks[transaction.ticker] = { totalOwned: transaction.quantity };
			}
		})

		var _updateBalance = function(moneyDif) {
			_balance += moneyDif;
		}

		var getBalance = function() {
			return _balance
		}

		var getOwnedStocks = function() {
			return _ownedStocks;
		}

		var buyStock = function(stock, formData) {
			var quantity = formData.quantity;
			var cost = -1 * (stock.data.Close * quantity);
			
			if (_ownedStocks[stock.ticker]) {
				_ownedStocks[stock.ticker].totalOwned += quantity;
			} else {
				_ownedStocks[stock.ticker] = { totalOwned: quantity };
			}

			TransactionService.addNewTransaction(stock, formData)
			_updateBalance(cost);
		}

		var sellStock = function(stock, formData) {
			var quantity = formData.quantity;
			var profit = stock.data.Close * quantity;
			
			_ownedStocks[stock.ticker].totalOwned -= quantity;

			TransactionService.addNewTransaction(stock, formData);
			_updateBalance(profit);
		}

		var getLastStock = function() {
			return _lastTradedStock
		}

		var setLastStock = function(ticker) {
			_lastTradedStock.ticker = ticker;
		}

		return {
			getBalance: getBalance,
			getOwnedStocks: getOwnedStocks,
			buyStock: buyStock,
			sellStock: sellStock,
			getLastStock: getLastStock,
			setLastStock: setLastStock,
		};

	}]
);
