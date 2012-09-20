var Telepathy = require('./telepathy');

console.log(new Telepathy('testing').password({
	user: 'rummik',
	domain: 'rummik.com',
	length: 300,
	alphabet: Telepathy.alphabet.base94
}));

