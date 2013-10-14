var Telepathy = require('../lib/telepathy.js');
require('should');

describe('Telepathy', function() {
	'use strict';

	describe('#password', function() {
		it('should work with no args', function() {
			new Telepathy().password().should.equal('jWEepHLxI5');
		});

		it('accepts an alphabet option', function() {
			new Telepathy().password({ alphabet: Telepathy.alphabet.base16 }).should.equal('1b7852b855');
		});

		it('accepts a length option', function() {
			new Telepathy().password({ length: 5 }).should.equal('HLxI5');
		});
	});
});
