var exec = require('child_process').exec;

/**
 * Telepathy CLI testing wrapper
 * @param test  NodeUnit test interface
 */
function TelepathyTestCLI(test) {
	this._test = test;
	this._tests = [];
}

/**
 * Appends a test to the test sequence
 * @param {string} args  String of CLI arguments to pass to telepathy-bin
 * @param {string} expect  Expected result
 */
TelepathyTestCLI.prototype.exec = function(args, expect) {
	this._tests.push({
		args: args,
		expect: expect
	});

	return this;
};

/** Fires off the next test in sequence */
TelepathyTestCLI.prototype.next = function() {
	var that = this,
	    test = this._tests.shift();

	exec(
		'./bin/telepathy -c test/telepathy-bin_config.json ' + test.args,
		function(error, stdout, stderr) {
			if (!error && !stderr)
				that._test.equal(stdout, test.expect);

			if (that._tests.length)
				that.next();
			else
				that._test.done();
		}
	);
};

/** Start test */
TelepathyTestCLI.prototype.start = function() {
	this.next();
};

module.exports = TelepathyTestCLI;
