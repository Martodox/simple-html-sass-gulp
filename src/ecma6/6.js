var markets = {
	id: "FTSE 100 (£1 Mini Contract)",
	check: function() {

		var self = this;

		console.log(this.id);
		console.log(self.id);

		(function() {

			console.log(this.id);
			console.log(self.id);
		}());
	}
};

markets.check();