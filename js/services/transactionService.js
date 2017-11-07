app.factory('TransactionService',
	function() {
		
		var _transactions = [
			{
				ticker: "AAPL",
				date: new Date('2/25/2017'),
				quantity: 1,
				price: "136.66",
				type: "Buy"
			},
			{
				ticker: "ADBE",
				date: new Date('4/23/2017'),
				quantity: 3,
				price: "131.52",
				type: "Buy"
			},
			{
				ticker: "AAPL",
				date: new Date('7/3/2017'),
				quantity: 2, 
				price: "143.50", 
				type: "Buy"
			},
		];

		var getTransactions = function() {
			return _transactions;
		}

		var addNewTransaction = function(stock, formData) {
			var newTransaction = {
				ticker: stock.ticker,
				date: formData.date,
				quantity: formData.quantity,
				price: stock.data.Close,
				type: formData.tradeOption,
			};
			
			_transactions.push(newTransaction);
		}
		
		return {
			getTransactions: getTransactions,
			addNewTransaction: addNewTransaction,
		};
	
	}
);
