var app = angular.module('StockApp', ['ui.router']);

// http://www.google.com/finance/historical?q=NASDAQ%3aADBE&startdate=Jan+01%2C+2016&enddate=Dec+31%2C+2016&output=csv

app.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/dashboard');

		$stateProvider

		.state('dashboard', {
			url: '/dashboard',
			views: {
				'': {
					templateUrl: './js/templates/dashboardMain.html',
					controller: 'DashboardMainController',
				},
				'date-picker': {
					templateUrl: './js/templates/datePicker.html',
					controller: 'DatePickerController',
				},
				'stocks': {
					templateUrl: './js/templates/stocks.html',
					controller: 'StockController',
				},
			},
			resolve: {
				stocks: function(StockService, DateService) {
					var date = DateService.getActiveDate();
					return StockService.getStocks(date);
				}
			}
		})

		.state('dashboard.trade', {
			url: '/trade/:ticker',
			views: {
				'': {
					templateUrl: './js/templates/trade.html',
					controller: 'TradeController',
				},
			},
			resolve: {
				stock: function($stateParams, TradeService, StockService) {
					if (!$stateParams.ticker) {
						$stateParams.ticker = TradeService.getLastStock();
					}
					return StockService.getStock($stateParams.ticker)
				}
			}
		})

		.state('dashboard.transactions', {
			url: '/transactions',
			views: {
				'': {
					templateUrl: './js/templates/transactions.html',
					controller: 'TransactionsController',
				},
			},
		})
		
		.state('dashboard.portfolio', {
			url: '/portfolio',
			views: {
				'': {
					templateUrl: './js/templates/portfolio.html',
					controller: 'PortfolioController',
				},
			},
		});
	}]
);

var StockAppNameSpace = StockAppNameSpace || {};

StockAppNameSpace.helpers = {
	csvJSON: function(csv) {
		var lines=csv.split("\n");
		
		var result = [];
	
		var headers=lines[0].split(",");
	
		for(var i=1;i<lines.length;i++){
	
			var obj = {};
			var currentline=lines[i].split(",");
	
			for(var j=0;j<headers.length;j++){
				obj[headers[j]] = currentline[j];
			}
	
			result.push(obj);
	
		}
		  
		return result; //JavaScript object
		// return JSON.stringify(result); //JSON
	},
 };
