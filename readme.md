![NPM][]
![Downloads][]
[![Builds][]][travis]
[![Deps][]][gemnasium]
[![Coverage][]][coveralls]

Telepathy
=========
A sync-less "telepathic" password manager that generates repeatable
site-specific passwords across any of your devices.

[Builds]: http://img.shields.io/travis-ci/chameleoid/telepathy.svg "Build Status"
[travis]: https://travis-ci.org/chameleoid/telepathy
[Deps]: https://img.shields.io/gemnasium/chameleoid/telepathy.svg "Dependency Status"
[gemnasium]: https://gemnasium.com/chameleoid/telepathy
[Coverage]: https://coveralls.io/repos/github/chameleoid/telepathy/badge.svg?branch=master
[coveralls]: https://coveralls.io/github/chameleoid/telepathy?branch=master
[Downloads]: https://img.shields.io/npm/dt/telepathy.svg
[NPM]: https://img.shields.io/npm/v/telepathy.svg


## How's it work?
At the core, it uses HASH(secret + user + domain) -> base-convert(62/94)


## Getting Started
Install with: `npm install -g telepathy`

```
> telepathy
Telepathically manage passwords.
Usage: telepathy
Version: 0.4.2

Options:
  -c, --config     config file                              [default: "/path/to/home/.telepathy.json"]
  -l, --length     password length                          [default: 10]
  -n, --count      number of passwords to display           [default: 1]
  -i, --index      starting password index                  [default: 0]
  -s, --safe       [deprecated] see lax                     [default: false]
  -x, --lax        lax mode (use base 62 instead of 94)     [default: false]
  -a, --algorithm  hashing algorithm to use                 [default: "SHA256"]
  -y, --clipboard  copy to clipboard instead of outputting  [default: true]
  -d, --domain                                              [required]
  -u, --username                                            [default: "you"]

Missing required arguments: d

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
  alphabet: Telepathy.alphabet.base94,
}));
```


## Contributing
Please see the [Chameleoid Styleguide][] before contributing.

Take care to maintain the existing coding style.  Add unit tests for any new or
changed functionality.  Lint and test your code using [Gulp][].

[Chameleoid Styleguide]: https://github.com/chameleoid/style
[Gulp]: http://gulpjs.com/


## License
Copyright (c) 2012-2017 Chameleoid and Kimberly Zick (rummik)
Licensed under the MPL.
