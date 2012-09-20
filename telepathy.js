var CryptoJS   = require('./crypto-js/hmac-sha512'),
    BD         = require('bigdecimal'),
    BigInteger = BD.BigInteger;

function Telepathy(secret) {
	this.password = this.constructor.prototype.password.bind(this, secret || '');
}

Telepathy.prototype.password = function(secret, options) {
	options = options || {};

	var length   = options.length   || 10,
	    user     = options.user     || '',
	    domain   = options.domain   || '',
	    secret   = options.secret   || secret,
	    alphabet = options.alphabet || Telepathy.alphabet.alphanumeric,
	    password = '',
	    base     = new BigInteger(alphabet.length.toString()),
	    data     = user + domain,
	    result, hash, remainder;

	while (password.length < length) {
		hash = new BigInteger(CryptoJS.HmacSHA512(data + password, secret).toString(), 16);

		// convert hash to an arbitrary base
		while (hash.compareTo(base) >= 0 && password.length < length) {
			result    = hash.divideAndRemainder(base);
			hash      = result[0];
			remainder = result[1];

			password = alphabet[remainder] + password;

			if (hash.compareTo(base) == -1 && password.length < length)
				password = alphabet[hash] + password;
		}

	}

	return password;
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
