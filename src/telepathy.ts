/*
 * Telepathy
 * https://gitlab.com/chameleoid/telepathy/core
 *
 * Copyright (c) 2012 *Kim Zick (rummik)
 * Copyright (c) 2019 Chameleoid
 *
 * Licensed under the MPL license.
 */

import baseX from 'base-x';

import { hasher, Algorithm } from './algorithm';
import { Alphabet } from './alphabet';
import { Options, PartialOptions } from './options';

export { Algorithm, Alphabet };

export default class Telepathy {
  protected readonly defaultOptions: Readonly<Options> = {
    algorithm: Algorithm.sha256,
    alphabet: Alphabet.base62,
    domain: '',
    index: 0,
    length: 10,
    username: '',
  };

  protected secret: string = '';

  constructor(
    protected options: PartialOptions = {},
  ) {}

  public setSecret(secret: string) {
    this.secret = secret;
  }

  public password(options: PartialOptions = {}): string {
    const opt: Readonly<Options> = {
      ...this.defaultOptions,
      ...this.options,
      ...options,
    };

    const baseConvert = baseX(opt.alphabet);
    const start = (opt.index + 1) * opt.length;

    let hash = '';

    while (hash.length < start) {
      const result = hasher(`${opt.username}${opt.domain}${hash}`, this.secret, opt.algorithm);
      hash = baseConvert.encode(result) + hash;
    }

    return hash.substr(hash.length - start, opt.length);
  }
}
