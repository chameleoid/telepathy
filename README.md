Telepathy [![Builds][]][travis] [![Deps][]][gemnasium] [![Donations][]][gittip]
=========
A telepathic password manager.

Telepathy creates site-specific, unique passwords using a shared secret.

[Builds]: http://img.shields.io/travis-ci/chameleoid/telepathy.png "Build Status"
[travis]: https://travis-ci.org/chameleoid/telepathy
[Deps]: https://gemnasium.com/chameleoid/telepathy.png "Dependency Status"
[gemnasium]: https://gemnasium.com/chameleoid/telepathy
[Donations]: http://img.sheilds.io/gittip/rummik.png
[gittip]: https://www.gittip.com/rummik/


## How's it work?
At the core, it uses HASH(secret + user + domain) -> base-convert(62/94)


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
    alphabet: Telepathy.alphabet.base94,
}));
```


## Contributing
Please see the [Chameleoid Styleguide][] before contributing.

Take care to maintain the existing coding style.  Add unit tests for any new or
changed functionality.  Lint and test your code using [Grunt][].

[Chameleoid Styleguide]: https://github.com/chameleoid/style
[Grunt]: http://gruntjs.com/


## License
Copyright (c) 2012-2013 rummik
Licensed under the MPL license.
