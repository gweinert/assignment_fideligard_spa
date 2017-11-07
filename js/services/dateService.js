app.factory('DateService', function() {
	var _activeDate = { index: 0 };
	var _dates = [];
	var _months = {
		0: 'Jan',
		1: 'Feb',
		2: 'Mar',
		3: 'Apr',
		4: 'May',
		5: 'Jun',
		6: 'Jul',
		7: 'Aug',
		8: 'Sep',
		9: 'Oct',
		10: 'Nov',
		11: 'Dec',
	};

	Date.prototype.addDays = function(days) {
		var date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	}

	var formatDate = function(date) {
		return date.getDate() + '-' + _months[date.getMonth()] + '-' + date.getFullYear().toString().slice(2);
	}
	
	var buildDates = function(startDate, stopDate) {
		var dateArray = new Array();
		var currentDate = startDate;
		while (currentDate <= stopDate) {
			// dateArray.push(new Date (currentDate));
			var date = new Date (currentDate);
			dateArray.push(formatDate(date));
			currentDate = currentDate.addDays(1);
		}
		return dateArray;
	}
	_dates = buildDates(new Date('1/1/2017'), new Date());

	var getDates = function() {
		return _dates;
	}

	var getActiveDate = function() {
		return _dates[_activeDate.index];
	}

	var getIndexObject = function() {
		return _activeDate;
	}

	var setActiveDateIndex = function(index) {
		_activeDate.index = index;
	}

	var setActiveDate = function(newDateObj) {
		var newDate = formatDate(newDateObj);
		var newActiveIndex = _dates.findIndex(function(date) {
			return date === newDate;
		});
		
		_activeDate.index = newActiveIndex;

	}




	return {
		getDates, getDates,
		getIndexObject: getIndexObject,
		getActiveDate: getActiveDate,
		setActiveDate: setActiveDate,
		setActiveDateIndex: setActiveDateIndex,
	};

});
