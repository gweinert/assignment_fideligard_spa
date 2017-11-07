app.factory('StockService',
	['$http', 'DateService',
	function($http, DateService) {
		var _stocks = [];
		var _stocksInfo = [];
		var _dates = DateService.getDates().reverse();

		var fetchStock = function(ticker) {
			// var url = 'http://www.google.com/finance/historical?q=NASDAQ%3a' + ticker + '&startdate=Jan+01%2C+2016&enddate=Dec+31%2C+2016&output=csv'
			var url = 'http://www.google.com/finance/historical?q=NASDAQ%3a' + ticker + '&startdate=Jan+01%2C+2017&output=csv'
			
			return $http.get(url)
				.then(function(res) {
					var stock = {
						ticker: ticker,
						data: _fixDateHoles(StockAppNameSpace.helpers.csvJSON(res.data)),
					};
					_stocks.push(stock);
					return _stocks;
				}, function(e) {
					console.log('fail', e);
				});
		}

		var _fixDateHoles = function(arr) {
			for (var i = 0; i < _dates.length; i++) {
				var date = _dates[i];
				var stock = arr[i];
				
				if (stock.Date !== date) {
					var newStock = Object.assign({}, stock, { Date: date });
					arr.splice(i, 0, newStock);
				}
			}
			
			return arr;
		}

		var _fetchStocks = function() {
			return fetchStock('ADBE')
				.then(function(){
					return fetchStock('AAPL')
					.then(function() {
						return fetchStock('GOOG');
					});
				});
		}


		var _buildStockInfo = function(date) {
			_stocksInfo.splice(0, _stocksInfo.length); // empty old array of stock dates;
			
			for (var i = 0; i < _stocks.length; i++) {
				var stock = _stocks[i];
				var stockInfo = null;
				if (date) {
					var stockInfoIndex = stock.data.findIndex(function(stockData) {
						return stockData.Date === date;
					});
					stockInfo = stock.data[stockInfoIndex];

					stockInfo.oneDay = _buildComparison(stockInfoIndex, 1, stock.data);
					stockInfo.sevenDay = _buildComparison(stockInfoIndex, 7, stock.data);
					stockInfo.thirtyDay = _buildComparison(stockInfoIndex, 30, stock.data);
					
				} else {
					stockInfo = stock.data[1];
				}
				_stocksInfo.push({ ticker: stock.ticker, data: stockInfo });
			}

			return _stocksInfo;
		}

		var _buildComparison = function(curIndex, numOfDays, data) {
			var stockToCompare = data[curIndex + numOfDays];
			var curStock = data[curIndex];

			if (stockToCompare) {
				return curStock.Close - stockToCompare.Close;
			} else return '';
		}

		var getStocks = function(date) {
			if (!_stocks.length) {
				return _fetchStocks()
				.then(function() {
					return _buildStockInfo(date);
				});
			} else {
				return _buildStockInfo(date);
			}	
		}

		var getStock = function(ticker, date) {
			if (_stocksInfo.length) {
				if (date) {
					_buildStockInfo(date);
				}
				return _stocksInfo.find(function(stockInfo) {
					return stockInfo.ticker === ticker;
				});
			}
		}

		return {
			getStocks: getStocks,
			getStock: getStock,
		};

	}]
);
