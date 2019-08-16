import { Buffer } from 'buffer';

import md5 from 'crypto-js/md5';
import ripemd160 from 'crypto-js/ripemd160';
import sha1 from 'crypto-js/sha1';
import sha224 from 'crypto-js/sha224';
import sha256 from 'crypto-js/sha256';
import sha3 from 'crypto-js/sha3';
import sha384 from 'crypto-js/sha384';
import sha512 from 'crypto-js/sha512';

const algorithms = {
  md5,
  sha1,
  sha224,
  sha256,
  sha384,
  sha512,
  ripemd160,

  sha3: (data: string) => sha3(data, { outputLength: 512 }),
  sha3_224: (data: string) => sha3(data, { outputLength: 224 }),
  sha3_256: (data: string) => sha3(data, { outputLength: 256 }),
  sha3_384: (data: string) => sha3(data, { outputLength: 384 }),
  sha3_512: (data: string) => sha3(data, { outputLength: 512 }),
};

export enum Algorithm {
  md5 = 'md5',
  sha1 = 'sha1',
  sha224 = 'sha224',
  sha256 = 'sha256',
  sha384 = 'sha384',
  sha512 = 'sha512',
  sha3 = 'sha3',
  sha3_224 = 'sha3_224',
  sha3_256 = 'sha3_256',
  sha3_384 = 'sha3_384',
  sha3_512 = 'sha3_512',
  ripemd160 = 'ripemd160',
};


export type AlgorithmStrings = keyof typeof Algorithm;

export function hasher(
  data: string,
  secret: string,
  algorithm: Algorithm | AlgorithmStrings,
): Buffer {
  return Buffer.from(algorithms[algorithm](secret + data).toString(), 'hex');
}
