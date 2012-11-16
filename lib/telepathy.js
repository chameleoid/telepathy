/*
 * telepathy
 * https://github.com/rummik/telepathy
 *
 * Copyright (c) 2012 rummik
 * Licensed under the MPL license.
 */

var CryptoJS   = require('../crypto-js/hmac-sha512'),
    BD         = require('bigdecimal'),
    BigInteger = BD.BigInteger;

function Telepathy(options) {
	options = options || {};

	if (typeof options == 'string')
		options = { secret: options };

	this.setSecret(options.secret);
	delete options.secret;

	this.user     = options.user || '';
	this.alphabet = options.alphabet || Telepathy.alphabet.base62;
	this.length   = options.length || 10;
	this.domain   = options.domain || '';
}

Telepathy.prototype.setSecret = function(secret) {
	this.password = this.constructor.prototype.password.bind(this, secret || '');
};

Telepathy.prototype.password = function(secret, options) {
	options = options || {};

	if (typeof options == 'string')
		options = { domain: options };

	if (typeof options == 'number')
		options = { index: options };

	var length   = parseInt(options.length || this.length || 10, 10),
	    index    = Math.max(parseInt(options.index || 0, 10), 0),
	    user     = options.user     || this.user,
	    domain   = options.domain   || this.domain,
	    alphabet = options.alphabet || this.alphabet,
	    password = '',
	    base     = new BigInteger(alphabet.length.toString()),
	    data     = user + domain,
	    len      = length * (index + 1),
	    result, hash, remainder;

	secret = options.secret || secret;

	while (password.length < len) {
		// create hash, and make it a big integer
		hash = new BigInteger(CryptoJS.HmacSHA512(data + password, secret).toString(), 16);

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
