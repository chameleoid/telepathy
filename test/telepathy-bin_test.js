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

var Telepathy        = require('../lib/telepathy.js'),
    TelepathyTestCLI = require('./lib/telepathytestcli.js');

exports['telepathy-bin'] = {
	'standard domain with default results': function(test) {
		test.expect(1);

		new TelepathyTestCLI(test)
			.exec('-d example.com', 'iIw+B2uWs,\nu@FJ.K-s{:\n(Eqo-9w.KV\nf#2K@XEowy\n0vU7ub/#&+\n')
			.start();
	},

	'test username option': function(test) {
		test.expect(1);

		new TelepathyTestCLI(test)
			.exec('-d example.com -u foo', 'J%HuXXpSpG\nm:B}vq"=g<\n*lbNskrL}O\nsu,rYsOTyD\nLMrhYYpN(%\n')
			.start();
	},

	'test starting index': function(test) {
		test.expect(1);

		new TelepathyTestCLI(test)
			.exec('-d example.com -i 4', '0vU7ub/#&+\n*oNo2h/Gi#\ne$!MCvZ=+M\n_"P%+(DFc7\nazT%$lCeLk\n')
			.start();
	},

	'test password length': function(test) {
		test.expect(1);

		new TelepathyTestCLI(test)
			.exec('-d example.com -l 4', 'uWs,\nw+B2\n{:iI\n.K-s\nu@FJ\n')
			.start();
	},

	'test lax mode': function(test) {
		test.expect(1);

		new TelepathyTestCLI(test)
			.exec('-d example.com -x', 'dQiyeU81Tb\n9qaYRNSKBw\nzVwWEd9plt\nCagcl4MboD\n2UmwQct5wm\n')
			.start();
	},

	'test password count': function(test) {
		test.expect(1);

		new TelepathyTestCLI(test)
			.exec('-d example.com -n 10', 'iIw+B2uWs,\nu@FJ.K-s{:\n(Eqo-9w.KV\nf#2K@XEowy\n0vU7ub/#&+\n*oNo2h/Gi#\ne$!MCvZ=+M\n_"P%+(DFc7\nazT%$lCeLk\nX3&<|zv"5,\n')
			.start();
	},

				test.done();
			}
		);
	}
};
