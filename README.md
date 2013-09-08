# Telepathy  [![Testing](https://secure.travis-ci.org/rummik/telepathy.png)](http://travis-ci.org/rummik/telepathy) [![Dependency Status](https://gemnasium.com/rummik/telepathy.png)](https://gemnasium.com/rummik/telepathy) [![](http://badgr.co/gittip/rummik.png)](https://www.gittip.com/rummik/)
A telepathic password manager.

Telepathy creates site-specific, unique passwords using a shared secret.

## How's it work?
At the core, it uses SHA3(secret + user + domain) -> base-convert(62/94)

## Getting Started
Install with: `npm install -g telepathy`

```
> telepathy
Telepathically manage passwords.
Usage: telepathy
Version: 0.3.1

Options:
  -c, --config     config file                           [default: "/path/to/home/.telepathy.json"]
  -l, --length     password length                       [default: 10]
  -n, --count      number of passwords to display        [default: 5]
  -i, --index      starting password index               [default: 0]
  -s, --safe       [deprecated] see lax                  [default: false]
  -x, --lax        lax mode (use base 62 instead of 94)  [default: false]
  -a, --algorithm  hashing algorithm to use              [default: "SHA256"]
  -d, --domain                                           [required]
  -u, --username                                         [default: "you"]

```

```
> telepathy -d example.com
iIw+B2uWs,
u@FJ.K-s{:
(Eqo-9w.KV
f#2K@XEowy
0vU7ub/#&+
```

## Documentation
_(Coming soon)_

## Examples
```javascript
var Telepathy = require('telepathy');

console.log(new Telepathy('testing').password({
	user: 'rummik',
	domain: 'rummik.com',
	length: 300,
	alphabet: Telepathy.alphabet.base94
}));
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/gruntjs/grunt).

## License
Copyright (c) 2012-2013 rummik
Licensed under the MPL license.
