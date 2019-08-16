import 'jest';
import Telepathy, { Algorithm, Alphabet } from './telepathy';

describe('Telepathy', () => {
  let telepathy: Telepathy;

  beforeEach(() => {
    telepathy = new Telepathy();
  });

  describe('#password()', () => {
    test('no options', () => {
      expect(telepathy.password()).toBe('jWEepHLxI5');
    });

    describe('options', () => {
      test.each([
        ['alphabet', Alphabet.base16, '1b7852b855'],
        ['length', 5, 'HLxI5'],
        ['length', 100, 'X7ANa2l0OfmXWUn8Er0oShvh35d8BzDgfkXpWjNCvQsJ9J9fBp1qWQPZGrzWtdMwJelxEeMmeB0EiiEGkAYggupnSUjWEepHLxI5'],
        ['algorithm', Algorithm.md5, 'DZ3I6vLDPK'],
        ['index', 20, 'i97AuVD6RY'],
        ['domain', 'example.com', 'qdcBMYL96t'],
        ['username', 'test', 'ik59zrzhv6'],
      ])('%s: %s', (option, value, expected) =>
        expect(telepathy.password({ [option]: value })).toBe(expected)
      );
    });

    describe('alphabets', () => {
      test.each([
        [ 'base2', '0001010101' ],
        [ 'base5', '0230232144' ],
        [ 'base8', '7024534125' ],
        [ 'base10', '5665086549' ],
        [ 'base16', '1b7852b855' ],
        [ 'base36', 'vixqqhkd3p' ],
        [ 'base62', 'jWEepHLxI5' ],
        [ 'base94', 'A^<ut7:8ej' ],
      ])('%s', (alphabet, expected) =>
        expect(telepathy.password({ alphabet: Alphabet[alphabet as keyof typeof Alphabet] })).toBe(expected)
      );
    });

    describe('algorithms', () => {
      beforeEach(() => {
        telepathy = new Telepathy({
          alphabet: Alphabet.base94,
          username: 'test',
          domain: 'example.com',
        });

        telepathy.setSecret('test');
      });

      test.each([
        ['md5', 'F!?m(?SB^%'],
        ['sha1', 'D_4#"73AM5'],
        ['sha224', 'y)E4_ivgWB'],
        ['sha256', 'z<u9N_[c"R'],
        ['sha384', '9P05(?7Px`'],
        ['sha512', 'V{fvC^YRi('],
        ['sha3', 'iIw+B2uWs,'],
        ['sha3_224', 'bi-U(46/-H'],
        ['sha3_256', '=!|Ob<J9LP'],
        ['sha3_384', 'PweY8x_;C4'],
        ['sha3_512', 'iIw+B2uWs,'],
        ['ripemd160', '[w!(k^|0?;'],
      ])('%s', (algorithm, expected) =>
        expect(telepathy.password({ algorithm: Algorithm[algorithm as keyof typeof Algorithm] })).toBe(expected)
      );
    });
  });
});
