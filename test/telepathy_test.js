var Telepathy = require('../lib/telepathy.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['password'] = {
	'no args': function(test) {
		test.expect(1);
		test.equal(new Telepathy().password(), 'lMOTgo2kUx');
		test.done();
	},
	'base16 alphabet': function(test) {
		test.expect(1);
		test.equal(new Telepathy().password({ alphabet: Telepathy.alphabet.base16 }), '2247225d47');
		test.done();
	},
	'length 5': function(test) {
		test.expect(1);
		test.equal(new Telepathy().password({ length: 5 }), 'o2kUx');
		test.done();
	}
};
