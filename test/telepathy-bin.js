var TelepathyTestCLI = require('./lib/telepathytestcli.js');
var telepathyCLI = new TelepathyTestCLI();
require('should');

describe('telepathy-bin', function() {
  'use strict';

  if (process.title == 'browser')
    return it('should do nothing', function() {});

  describe('standard domain with default results', function() {
    telepathyCLI.exec('-d example.com', 'z<u9N_[c"R\ng:3WGYj0}~\n4WoBT`c3q4\nVtav?h"$0?\n;L0)EkaAKg\n');
  });

  describe('test username option', function() {
    telepathyCLI.exec('-d example.com -u foo', '9\'Bn_Dt]Uv\niqHBmyZU>J\nFQ2`KX=,.j\n-3PI+EuG;o\n4IWl/+-I9p\n');
  });

  describe('test starting index', function() {
    telepathyCLI.exec('-d example.com -i 4', ';L0)EkaAKg\nr\'3b(L8bvh\nrz80RFR667\n[%^gCi$=Lw\n>|-Ll/mW-a\n');
  });

  describe('test password length', function() {
    telepathyCLI.exec('-d example.com -l 4', '[c"R\nu9N_\n}~z<\nGYj0\ng:3W\n');
  });

  describe('test lax mode', function() {
    telepathyCLI.exec('-d example.com -x', 'XqQoIZF58B\nRqUBdjJtX7\nyjpwoHtdc0\nwUcC8TBH8k\nJEJC1hffn2\n');
  });

  describe('test password count', function() {
    telepathyCLI.exec('-d example.com -n 10', 'z<u9N_[c"R\ng:3WGYj0}~\n4WoBT`c3q4\nVtav?h"$0?\n;L0)EkaAKg\nr\'3b(L8bvh\nrz80RFR667\n[%^gCi$=Lw\n>|-Ll/mW-a\n1wroDAq=^e\n');
  });

  describe('test additional algorithms', function() {
    telepathyCLI
      .exec('-d example.com -n 1 -a MD5', 'F!?m(?SB^%\n')
      .exec('-d example.com -n 1 -a SHA1', 'D_4#"73AM5\n')
      .exec('-d example.com -n 1 -a SHA224', 'y)E4_ivgWB\n')
      .exec('-d example.com -n 1 -a SHA256', 'z<u9N_[c"R\n')
      .exec('-d example.com -n 1 -a SHA384', '9P05(?7Px`\n')
      .exec('-d example.com -n 1 -a SHA512', 'V{fvC^YRi(\n')
      .exec('-d example.com -n 1 -a SHA3', 'iIw+B2uWs,\n')
      .exec('-d example.com -n 1 -a SHA3_224', 'bi-U(46/-H\n')
      .exec('-d example.com -n 1 -a SHA3_256', '=!|Ob<J9LP\n')
      .exec('-d example.com -n 1 -a SHA3_384', 'PweY8x_;C4\n')
      .exec('-d example.com -n 1 -a SHA3_512', 'iIw+B2uWs,\n')
      .exec('-d example.com -n 1 -a RIPEMD160', '[w!(k^|0?;\n');
  });

  describe('test config options', function() {
    telepathyCLI
      .config('algorithm').exec('-d example.com', 'V{fvC^YRi(\ns"_V8!DBk;\nlUnV_cD&$w\n*A}iC"}RfH\nG9{3;3u00j\n')
      .config('count').exec('-d example.com', 'z<u9N_[c"R\ng:3WGYj0}~\n4WoBT`c3q4\nVtav?h"$0?\n;L0)EkaAKg\nr\'3b(L8bvh\nrz80RFR667\n[%^gCi$=Lw\n>|-Ll/mW-a\n1wroDAq=^e\n')
      .config('index').exec('-d example.com', 'r\'3b(L8bvh\nrz80RFR667\n[%^gCi$=Lw\n>|-Ll/mW-a\n1wroDAq=^e\n')
      .config('lax').exec('-d example.com', 'XqQoIZF58B\nRqUBdjJtX7\nyjpwoHtdc0\nwUcC8TBH8k\nJEJC1hffn2\n')
      .config('length').exec('-d example.com', '_[c"R\nz<u9N\nYj0}~\ng:3WG\n`c3q4\n');
  });
});
