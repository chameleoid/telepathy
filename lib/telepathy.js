/*
 * telepathy
 * https://github.com/rummik/telepathy
 *
 * Copyright (c) 2012 rummik
 * Licensed under the MPL license.
 */

var CryptoJS   = require('crypto-js'),
    BD         = require('bigdecimal'),
    BigInteger = BD.BigInteger;

/**
 * Telepathy constructor
 * @constructor
 * @param {object|string} [options]
 */
function Telepathy(options) {
	options = options || {};

	if (typeof options == 'string')
		options = { secret: options };

	this.setSecret(options.secret);
	delete options.secret;

	this.user      = options.user || '';
	this.alphabet  = options.alphabet || Telepathy.alphabet.base62;
	this.length    = options.length || 10;
	this.domain    = options.domain || '';
	this.algorithm = options.algorithm || 'SHA256';
}

/**
 * Set the private secret we'll be using in generating passwords
 * @param {string} secret
 */
Telepathy.prototype.setSecret = function(secret) {
	this.password = this.constructor.prototype._password.bind(this, secret || '');
};

/**
 * Generate a password
 * @param {object|string|number} [options]
 * @returns {string} Generated password
 * @example
 * var telepathy = new Telepathy('secret');
 * console.log(telepathy.password('google.com'));
 */
Telepathy.prototype.password = function(options) {};

/** @ignore */
Telepathy.prototype._password = function(secret, options) {
	options = options || {};

	if (typeof options == 'string')
		options = { domain: options };

	if (typeof options == 'number')
		options = { index: options };

	var length    = parseInt(options.length || this.length || 10, 10),
	    index     = Math.max(parseInt(options.index || 0, 10), 0),
	    user      = options.user     || this.user,
	    domain    = options.domain   || this.domain,
	    alphabet  = options.alphabet || this.alphabet,
	    algorithm = options.algorithm || this.algorithm,
	    hasher    = Telepathy.algorithms[algorithm.toUpperCase()] || Telepathy.algorithms['SHA256'],
	    password  = '',
	    base      = new BigInteger(alphabet.length.toString()),
	    data      = user + domain,
	    len       = length * (index + 1),
	    result, hash, remainder;

	secret = options.secret || secret;

	while (password.length < len) {
		// create hash, and make it a big integer
		hash = new BigInteger(hasher(data + password, secret).toString(), 16);

		// convert hash to an arbitrary base
		while (hash.compareTo(base) >= 0 && password.length < len) {
			result    = hash.divideAndRemainder(base);
			hash      = result[0];
			remainder = result[1];

			password = alphabet[remainder] + password;

			if (hash.compareTo(base) == -1 && password.length < len)
				password = alphabet[hash] + password;
		}
	}

	return password.substr(0, length);
};


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
	}
};

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
	base2:  '01'
};

module.exports = Telepathy;
