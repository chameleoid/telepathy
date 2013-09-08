var exec = require('child_process').exec;

/**
 * Telepathy CLI testing wrapper
 * @param test  NodeUnit test interface
 * @param {string} [config='default']  Config file name as would be passed to {Telepathy#config}
 */
function TelepathyTestCLI(test, config) {
	this._test = test;
	this._tests = [];
	this.config(config || 'default');
}

/**
 * Change config file (inline option)
 * @param {string} config  Name of config file to use (becomes `test/config/{config}.json`)
 * @returns {TelepathyTestCLI}
 */
TelepathyTestCLI.prototype.config = function(config) {
	this._config = 'test/config/' + config + '.json';
	return this;
};

/**
 * Appends a test to the test sequence
 * @param {string} args  String of CLI arguments to pass to telepathy-bin
 * @param {string} expect  Expected result
 * @returns {TelepathyTestCLI}
 */
TelepathyTestCLI.prototype.exec = function(args, expect) {
	this._tests.push({
		config: this._config,
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
		['./bin/telepathy', '-c ' + test.config, test.args].join(' '),
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
