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
					test.equal(stdout, 'DfQi/8`jh-\nrl<kFYRKZ.\nM~U+UVC;`\\\n5*ZX29$EJ8\nY#QMnk8[72\n');

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
					test.equal(stdout, ':iwvUjE,#g\nhk)\\ceP@0e\np*H-iczWH-\n4PVU)OSz9D\nM{}8-m?;ls\n');

					// pulled from 'default' results
					test.notEqual(stdout, 'DfQi/8`jh-\nrl<kFYRKZ.\nM~U+UVC;`\\\n5*ZX29$EJ8\nY#QMnk8[72\n');
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
					test.equal(stdout, 'Y#QMnk8[72\ne~*Xk;vT?X\n.KGC~kQY5>\n,"Vt7c\'rV.\nKtL#IdU#09\n');

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
					test.equal(stdout, '`jh-\nQi/8\nZ.Df\nFYRK\nrl<k\n');

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
					test.equal(stdout, '4pyMxGx7VK\nhz44M51u0S\njw61jEM58X\nzvhJ1xLwEy\nMN60IKYhDX\n');

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
					test.equal(stdout, 'DfQi/8`jh-\nrl<kFYRKZ.\nM~U+UVC;`\\\n5*ZX29$EJ8\nY#QMnk8[72\ne~*Xk;vT?X\n.KGC~kQY5>\n,"Vt7c\'rV.\nKtL#IdU#09\ncW(G\\N,oPo\n');

				test.done();
			}
		);
	}
};
