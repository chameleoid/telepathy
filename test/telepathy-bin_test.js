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

var exec      = require('child_process').exec,
    telepathy = './bin/telepathy -c test/telepathy-bin_config.json ';

exports['telepathy-bin'] = {
	'standard domain with default results': function(test) {
		test.expect(1);

		exec(
			telepathy + '-d example.com',
			function(error, stdout, stderr) {
				if (!error && !stderr)
					test.equal(stdout, 'iIw+B2uWs,\nu@FJ.K-s{:\n(Eqo-9w.KV\nf#2K@XEowy\n0vU7ub/#&+\n');

				test.done();
			}
		);
	},

	'test username option': function(test) {
		test.expect(2);

		exec(
			telepathy + '-d example.com -u foo',
			function(error, stdout, stderr) {
				if (!error && !stderr) {
					test.equal(stdout, 'J%HuXXpSpG\nm:B}vq"=g<\n*lbNskrL}O\nsu,rYsOTyD\nLMrhYYpN(%\n');

					// pulled from 'default' results
					test.notEqual(stdout, 'iIw+B2uWs,\nu@FJ.K-s{:\n(Eqo-9w.KV\nf#2K@XEowy\n0vU7ub/#&+\n');
				}

				test.done();
			}
		);
	},

	'test starting index': function(test) {
		test.expect(1);

		exec(
			telepathy + '-d example.com -i 4',
			function(error, stdout, stderr) {
				if (!error && !stderr)
					test.equal(stdout, '0vU7ub/#&+\n*oNo2h/Gi#\ne$!MCvZ=+M\n_"P%+(DFc7\nazT%$lCeLk\n');

				test.done();
			}
		);
	},

	'test password length': function(test) {
		test.expect(1);

		exec(
			telepathy + '-d example.com -l 4',
			function(error, stdout, stderr) {
				if (!error && !stderr)
					test.equal(stdout, 'uWs,\nw+B2\n{:iI\n.K-s\nu@FJ\n');

				test.done();
			}
		);
	},

	'test lax mode': function(test) {
		test.expect(1);

		exec(
			telepathy + '-d example.com -x',
			function(error, stdout, stderr) {
				if (!error && !stderr)
					test.equal(stdout, 'dQiyeU81Tb\n9qaYRNSKBw\nzVwWEd9plt\nCagcl4MboD\n2UmwQct5wm\n');

				test.done();
			}
		);
	},

	'test password count': function(test) {
		test.expect(1);

		exec(
			telepathy + '-d example.com -n 10',
			function(error, stdout, stderr) {
				if (!error && !stderr)
					test.equal(stdout, 'iIw+B2uWs,\nu@FJ.K-s{:\n(Eqo-9w.KV\nf#2K@XEowy\n0vU7ub/#&+\n*oNo2h/Gi#\ne$!MCvZ=+M\n_"P%+(DFc7\nazT%$lCeLk\nX3&<|zv"5,\n');

				test.done();
			}
		);
	}
};
