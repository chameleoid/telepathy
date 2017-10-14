/*
 * telepathy
 * https://github.com/rummik/telepathy
 *
 * Copyright (c) 2012 rummik
 * Licensed under the MPL license.
 */

var CryptoJS = require('crypto-js');
var BigInteger = require('bigdecimal').BigInteger;

/**
 * Telepathy constructor
 * @constructor
 * @param {object|string} [options]
 */
function Telepathy(options) {
	'use strict';

	options = options || {};

	if (typeof options == 'string')
		options = { secret: options };

	/** Private variable shared secret */
	var _secret = options.secret || '';
	delete options.secret;

	this.user = options.user || '';
	this.alphabet = options.alphabet || Telepathy.alphabet.base62;
	this.length = options.length || 10;
	this.domain = options.domain || '';
	this.algorithm = options.algorithm || 'SHA256';

	/**
	 * Set the private secret we'll be using in generating passwords
	 * @param {string} secret
	 */
	this.setSecret = function(secret) {
		_secret = secret || '';
	};

	/**
	 * Generate a password
	 * @param {object|string|number} [options]
	 * @returns {string} Generated password
	 * @example
	 * var telepathy = new Telepathy('secret');
	 * console.log(telepathy.password('google.com'));
	 */
	this.password = function(options) {
		return this._password(_secret, options);
	};
}

/** @ignore */
Telepathy.prototype._password = function(secret, options) {
	'use strict';

	options = options || {};

	if (typeof options == 'string')
		options = { domain: options };

	if (typeof options == 'number')
		options = { index: options };

	secret = options.secret || secret;

	var length = parseInt(options.length || this.length || 10, 10);
	var index = Math.max(parseInt(options.index || 0, 10), 0);
	var len = length * (index + 1);

	var algorithm = options.algorithm || this.algorithm;
	var hasher = Telepathy.algorithms[algorithm.toUpperCase()] || Telepathy.algorithms.SHA256;

	var alphabet = options.alphabet || this.alphabet;
	var base = new BigInteger(alphabet.length.toString());

	var user = options.user || this.user;
	var domain = options.domain || this.domain;
	var data = user + domain;

	var password = '';
	while (password.length < len) {
		// create hash, and make it a big integer
		var hash = new BigInteger(hasher(data + password, secret).toString(), 16);

		// convert hash to an arbitrary base
		while (hash.compareTo(base) >= 0 && password.length < len) {
			var result = hash.divideAndRemainder(base);
			var remainder = result[1];
			hash = result[0];

			password = alphabet[remainder] + password;

			if (hash.compareTo(base) == -1 && password.length < len)
				password = alphabet[hash] + password;
		}
	}

	return password.substr(0, length);
};


(function() {
	'use strict';

	/**
	 * Available hashing algorithms
	 * @namespace
	 */
	Telepathy.algorithms = {
		MD5: function(data, secret) {
			return CryptoJS.MD5(secret + data);
		},

		SHA1: function(data, secret) {
			return CryptoJS.SHA1(secret + data);
		},

		SHA512: function(data, secret) {
			return CryptoJS.SHA512(secret + data);
		},
		SHA384: function(data, secret) {
			return CryptoJS.SHA384(secret + data);
		},
		SHA256: function(data, secret) {
			return CryptoJS.SHA256(secret + data);
		},
		SHA224: function(data, secret) {
			return CryptoJS.SHA224(secret + data);
		},

		SHA3: function(data, secret) {
			return Telepathy.algorithms.SHA3_512(data, secret);
		},
		SHA3_512: function(data, secret) {
			return CryptoJS.SHA3(secret + data, { outputLength: 512 });
		},
		SHA3_384: function(data, secret) {
			return CryptoJS.SHA3(secret + data, { outputLength: 384 });
		},
		SHA3_256: function(data, secret) {
			return CryptoJS.SHA3(secret + data, { outputLength: 256 });
		},
		SHA3_224: function(data, secret) {
			return CryptoJS.SHA3(secret + data, { outputLength: 224 });
		},

		RIPEMD160: function(data, secret) {
			return CryptoJS.RIPEMD160(secret + data);
		},
	};
})();

/**
 * Output alphabets used in password generation (larger alphabets are better)
 * @readonly
 * @namespace
 * @property {string} base94 WARNING: this could break insecure login forms
 * @property {string} base62
 * @property {string} base36
 * @property {string} base16
 * @property {string} base10
 * @property {string} base8
 * @property {string} base5
 * @property {string} base2
 */
Telepathy.alphabet = {
	base94: '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
	base62: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
	base36: '0123456789abcdefghijklmnopqrstuvwxyz',
	base16: '0123456789abcdef',
	base10: '0123456789',
	base8:  '01234567',
	base5:  '01234',
	base2:  '01',
};

module.exports = Telepathy;
