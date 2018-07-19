var exec = require('child_process').exec;
require('should');

/**
 * Telepathy CLI testing wrapper
 * @param test  NodeUnit test interface
 * @param {string} [config='default']  Config file name as would be passed to {Telepathy#config}
 */
function TelepathyTestCLI(config) {
  'use strict';
  this.config(config || 'default');
}

/**
 * Change config file (inline option)
 * @param {string} config  Name of config file to use (becomes `test/config/{config}.json`)
 * @returns {TelepathyTestCLI}
 */
TelepathyTestCLI.prototype.config = function(config) {
  'use strict';
  this._config = 'test/config/' + config + '.json';
  return this;
};

/**
 * Appends a test to the test sequence
 * @param {string} args  String of CLI arguments to pass to telepathy-bin
 * @param {string} expect  Expected result
 * @param {function} [callback]  Function to be called after process exits
 * @returns {TelepathyTestCLI}
 */
TelepathyTestCLI.prototype.exec = function(args, expect, callback) {
  'use strict';
  var config = this._config;

  it(`handles "${args}" with config "${config.split('/').pop()}"`, function(done) {
    exec(
      ['./bin/telepathy', '-c ' + config, args].join(' '),
      function(error, stdout, stderr) {
        stdout.should.equal(expect);

        if (typeof callback === 'function') {
          callback();
        }

        done();
      }
    );
  });

  return this;
};

module.exports = TelepathyTestCLI;
