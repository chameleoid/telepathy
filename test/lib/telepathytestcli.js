var exec   = require('child_process').exec,
    should = require('should');

/**
 * Telepathy CLI testing wrapper
 * @param test  NodeUnit test interface
 * @param {string} [config='default']  Config file name as would be passed to {Telepathy#config}
 */
function TelepathyTestCLI(config) {
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
	var that = this,
	    config = this._config;

	it('should return ' + expect, function(done) {
		exec(
			['./bin/telepathy', '-c ' + config, args].join(' '),
			function(error, stdout, stderr) {
				if (!error && !stderr)
					stdout.should.equal(expect);

				done();
			}
		);
	});


	return this;
};

/** Fires off the next test in sequence */
TelepathyTestCLI.prototype.next = function() {
};

module.exports = TelepathyTestCLI;
